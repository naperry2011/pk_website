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
  townId: string | null; // null for council-wide announcements
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
  funeralEndDate?: string;
  townId: string;
  photo: string | null;
  biography?: string;
  familyContact?: string;
  submittedByName?: string;
  submittedByEmail?: string;
  submittedByPhone?: string;
}

export interface Wedding {
  id: string;
  bride: string;
  groom: string;
  date: string;
  endDate?: string;
  townId: string;
  venue: string;
  photos?: string[];
  submittedByName?: string;
  submittedByEmail?: string;
  submittedByPhone?: string;
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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentLocation: string;
  birthday: string;
  obituaries: boolean;
  weddings: boolean;
  councilBusiness: boolean;
  events: boolean;
  townFilters: string[];
}
