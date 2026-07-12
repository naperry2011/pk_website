-- Akuapem Paramount King Council - Database Migration
-- Run this in Supabase SQL Editor

-- Enums
CREATE TYPE user_role AS ENUM ('admin', 'editor');
CREATE TYPE announcement_type AS ENUM ('event', 'council', 'development', 'urgent');
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Towns (text PK to preserve URL slugs)
CREATE TABLE towns (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  chief TEXT NOT NULL,
  description TEXT,
  landmarks TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Announcements
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  type announcement_type NOT NULL DEFAULT 'event',
  town_id TEXT REFERENCES towns(id) ON DELETE SET NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Obituaries (with approval workflow)
CREATE TABLE obituaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  birth_date DATE,
  passed_date DATE NOT NULL,
  funeral_date DATE NOT NULL,
  town_id TEXT NOT NULL REFERENCES towns(id) ON DELETE RESTRICT,
  photo_url TEXT,
  biography TEXT,
  family_contact TEXT,
  status approval_status NOT NULL DEFAULT 'pending',
  submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  review_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Weddings (with approval workflow)
CREATE TABLE weddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bride TEXT NOT NULL,
  groom TEXT NOT NULL,
  date DATE NOT NULL,
  town_id TEXT NOT NULL REFERENCES towns(id) ON DELETE RESTRICT,
  venue TEXT NOT NULL,
  message TEXT,
  photos TEXT[] NOT NULL DEFAULT '{}',
  contact_email TEXT,
  status approval_status NOT NULL DEFAULT 'pending',
  submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  review_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'editor'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_towns_updated_at BEFORE UPDATE ON towns FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_obituaries_updated_at BEFORE UPDATE ON obituaries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_weddings_updated_at BEFORE UPDATE ON weddings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_announcements_date ON announcements(date DESC);
CREATE INDEX idx_announcements_type ON announcements(type);
CREATE INDEX idx_announcements_town_id ON announcements(town_id);
CREATE INDEX idx_obituaries_status ON obituaries(status);
CREATE INDEX idx_obituaries_town_id ON obituaries(town_id);
CREATE INDEX idx_weddings_status ON weddings(status);
CREATE INDEX idx_weddings_town_id ON weddings(town_id);

-- ============================================================
-- Row Level Security Policies
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE towns ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE obituaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper: check if current user is admin or editor
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update profiles" ON profiles FOR UPDATE USING (is_admin());

-- Towns policies
CREATE POLICY "Anyone can view towns" ON towns FOR SELECT USING (true);
CREATE POLICY "Staff can insert towns" ON towns FOR INSERT WITH CHECK (is_staff());
CREATE POLICY "Staff can update towns" ON towns FOR UPDATE USING (is_staff());
CREATE POLICY "Admins can delete towns" ON towns FOR DELETE USING (is_admin());

-- Announcements policies
CREATE POLICY "Anyone can view announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Staff can insert announcements" ON announcements FOR INSERT WITH CHECK (is_staff());
CREATE POLICY "Staff can update announcements" ON announcements FOR UPDATE USING (is_staff());
CREATE POLICY "Admins can delete announcements" ON announcements FOR DELETE USING (is_admin());

-- Obituaries policies
CREATE POLICY "Anyone can view approved obituaries" ON obituaries FOR SELECT USING (status = 'approved' OR is_staff());
CREATE POLICY "Anyone can insert obituaries" ON obituaries FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update obituaries" ON obituaries FOR UPDATE USING (is_staff());
CREATE POLICY "Admins can delete obituaries" ON obituaries FOR DELETE USING (is_admin());

-- Weddings policies
CREATE POLICY "Anyone can view approved weddings" ON weddings FOR SELECT USING (status = 'approved' OR is_staff());
CREATE POLICY "Anyone can insert weddings" ON weddings FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can update weddings" ON weddings FOR UPDATE USING (is_staff());
CREATE POLICY "Admins can delete weddings" ON weddings FOR DELETE USING (is_admin());

-- ============================================================
-- Storage
-- ============================================================

INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Anyone can view media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Authenticated users can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Staff can delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND is_staff());
