export interface Town {
  id: string;
  name: string;
  chief: string;
  history?: string;
  landmarks?: string[];
  contactEmail?: string;
  contactPhone?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  type: "event" | "council" | "development" | "urgent";
  excerpt: string;
  content?: string;
  imageUrl?: string;
}

export interface Obituary {
  id: string;
  name: string;
  birthDate: string;
  passedDate: string;
  funeralDate: string;
  town: string;
  photo: string | null;
  biography?: string;
  familyContact?: string;
}

export interface Wedding {
  id: string;
  bride: string;
  groom: string;
  date: string;
  town: string;
  venue: string;
  photos?: string[];
}

export interface ParamountKing {
  name: string;
  title: string;
  lineage: string;
  enstoolmentDate: string;
  biography: string;
  photo?: string;
}

export interface SubscriptionPreferences {
  email: string;
  obituaries: boolean;
  weddings: boolean;
  councilBusiness: boolean;
  events: boolean;
}
