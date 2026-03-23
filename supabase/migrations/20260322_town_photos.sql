CREATE TABLE town_photos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  town_id text NOT NULL REFERENCES towns(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  display_order integer DEFAULT 0,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index for fast lookups by town
CREATE INDEX idx_town_photos_town_id ON town_photos(town_id);

-- RLS policies
ALTER TABLE town_photos ENABLE ROW LEVEL SECURITY;

-- Anyone can view photos
CREATE POLICY "Public can view town photos" ON town_photos
  FOR SELECT USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated users can insert town photos" ON town_photos
  FOR INSERT TO authenticated WITH CHECK (true);

-- Authenticated users can update
CREATE POLICY "Authenticated users can update town photos" ON town_photos
  FOR UPDATE TO authenticated USING (true);

-- Authenticated users can delete
CREATE POLICY "Authenticated users can delete town photos" ON town_photos
  FOR DELETE TO authenticated USING (true);
