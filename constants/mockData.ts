// Mock data for development - will be replaced with API calls

export const towns = [
  { id: "akropong", name: "Akropong", chief: "Osabarima Ofori Dua III" },
  { id: "abiriw", name: "Abiriw", chief: "Nana Addo Birikorang" },
  { id: "amanokrom", name: "Amanokrom", chief: "Nana Kwadwo Anim" },
  { id: "awukugua", name: "Awukugua", chief: "Nana Kwaku Duah" },
  { id: "berekuso", name: "Berekuso", chief: "Nana Osei Bonsu" },
  { id: "tutu", name: "Tutu", chief: "Nana Yaw Agyeman" },
  { id: "mamfe", name: "Mamfe", chief: "Nana Kofi Asante" },
  { id: "larteh", name: "Larteh", chief: "Nana Kwame Opoku" },
  { id: "adukrom", name: "Adukrom", chief: "Nana Akwasi Boateng" },
  { id: "mampong", name: "Mampong", chief: "Nana Yaw Mensah" },
  { id: "obosomase", name: "Obosomase", chief: "Nana Kofi Owusu" },
  { id: "apirede", name: "Apirede", chief: "Nana Kwadwo Asare" },
  { id: "aseseeso", name: "Aseseeso", chief: "Nana Adu Gyamfi" },
  { id: "dawu", name: "Dawu", chief: "Nana Yaw Amoako" },
  { id: "koforidua", name: "Koforidua", chief: "Nana Kwaku Agyei" },
  { id: "nsawam", name: "Nsawam", chief: "Nana Osei Tutu" },
  { id: "suhum", name: "Suhum", chief: "Nana Kwame Boahen" },
];

// Helper to get town name from ID
export const getTownName = (townId: string) => {
  const town = towns.find((t) => t.id === townId);
  return town?.name || townId;
};

export const announcements = [
  {
    id: "1",
    title: "Annual Odwira Festival 2026",
    date: "2026-09-15",
    type: "event" as const,
    townId: "akropong", // Main festival location
    excerpt:
      "The Akuapem Traditional Council announces the dates for the annual Odwira Festival celebrations.",
  },
  {
    id: "2",
    title: "Council Meeting Resolution",
    date: "2026-01-10",
    type: "council" as const,
    townId: null, // Council-wide, not town-specific
    excerpt:
      "Summary of key decisions from the January Traditional Council meeting.",
  },
  {
    id: "3",
    title: "New Development Initiative",
    date: "2026-01-05",
    type: "development" as const,
    townId: null,
    excerpt:
      "The Council partners with government on new infrastructure projects.",
  },
  {
    id: "4",
    title: "Larteh Cultural Day",
    date: "2026-03-20",
    type: "event" as const,
    townId: "larteh",
    excerpt:
      "Annual celebration of Larteh's unique cultural heritage and traditions.",
  },
  {
    id: "5",
    title: "Mampong Road Rehabilitation",
    date: "2026-02-01",
    type: "development" as const,
    townId: "mampong",
    excerpt:
      "Construction begins on the main road rehabilitation project in Mampong.",
  },
];

export const obituaries = [
  {
    id: "1",
    name: "Maame Akua Asantewaa",
    birthDate: "1945-03-15",
    passedDate: "2026-01-10",
    funeralDate: "2026-02-01",
    townId: "akropong",
    photo: null,
  },
  {
    id: "2",
    name: "Opanin Kwame Boateng",
    birthDate: "1938-07-22",
    passedDate: "2026-01-08",
    funeralDate: "2026-01-28",
    townId: "larteh",
    photo: null,
  },
  {
    id: "3",
    name: "Nana Yaa Asantewaa",
    birthDate: "1950-06-12",
    passedDate: "2026-01-15",
    funeralDate: "2026-02-10",
    townId: "mampong",
    photo: null,
  },
  {
    id: "4",
    name: "Opanin Kofi Mensah",
    birthDate: "1942-11-03",
    passedDate: "2026-01-12",
    funeralDate: "2026-02-05",
    townId: "akropong",
    photo: null,
  },
];

export const weddings = [
  {
    id: "1",
    bride: "Akosua Mensah",
    groom: "Kofi Asante",
    date: "2026-02-14",
    townId: "mampong",
    venue: "Mampong Presbyterian Church",
  },
  {
    id: "2",
    bride: "Adwoa Serwaa",
    groom: "Kwame Owusu",
    date: "2026-03-08",
    townId: "akropong",
    venue: "Basel Mission Church, Akropong",
  },
  {
    id: "3",
    bride: "Ama Darko",
    groom: "Yaw Boateng",
    date: "2026-04-15",
    townId: "larteh",
    venue: "Larteh Presbyterian Church",
  },
];

export const paramountKing = {
  name: "Oseadeeyo Nana Kwasi Akufo III",
  title: "Okuapehene",
  lineage: "31st Paramount King of Akuapem",
  enstoolmentDate: "2020-05-15",
  biography:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
};

export const councilHistory = {
  summary:
    "The Akuapem Traditional Council is one of the oldest and most respected traditional institutions in Ghana, with a rich history dating back several centuries. The council serves as the bridge between the people of Akuapem and the government of Ghana.",
  founded: "Pre-colonial era",
  headquarters: "Akropong-Akuapem",
};

// Helper functions to filter by town
export const getObituariesByTown = (townId: string) =>
  obituaries.filter((o) => o.townId === townId);

export const getWeddingsByTown = (townId: string) =>
  weddings.filter((w) => w.townId === townId);

export const getAnnouncementsByTown = (townId: string) =>
  announcements.filter((a) => a.townId === townId);
