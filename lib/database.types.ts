export type UserRole = "admin" | "editor";
export type AnnouncementType = "event" | "council" | "development" | "urgent";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Town {
  id: string;
  name: string;
  chief: string;
  description: string | null;
  landmarks: string[];
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  type: AnnouncementType;
  town_id: string | null;
  excerpt: string;
  content: string | null;
  image_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Obituary {
  id: string;
  name: string;
  birth_date: string | null;
  passed_date: string;
  funeral_date: string;
  town_id: string;
  photo_url: string | null;
  biography: string | null;
  family_contact: string | null;
  status: ApprovalStatus;
  submitted_by: string | null;
  reviewed_by: string | null;
  review_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Wedding {
  id: string;
  bride: string;
  groom: string;
  date: string;
  town_id: string;
  venue: string;
  message: string | null;
  photos: string[];
  contact_email: string | null;
  status: ApprovalStatus;
  submitted_by: string | null;
  reviewed_by: string | null;
  review_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      towns: {
        Row: Town;
        Insert: Omit<Town, "created_at" | "updated_at">;
        Update: Partial<Omit<Town, "created_at">>;
      };
      announcements: {
        Row: Announcement;
        Insert: Omit<Announcement, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Announcement, "id" | "created_at">>;
      };
      obituaries: {
        Row: Obituary;
        Insert: Omit<Obituary, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Obituary, "id" | "created_at">>;
      };
      weddings: {
        Row: Wedding;
        Insert: Omit<Wedding, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Wedding, "id" | "created_at">>;
      };
    };
  };
}
