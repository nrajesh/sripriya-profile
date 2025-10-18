export interface CoverImage {
  id: string; // Using string for UUIDs
  fileName: string; // e.g., "my-book-cover.jpg"
  url: string; // e.g., "/covers/my-book-cover.jpg"
}

// This array will be populated and managed via the admin interface
export const rawCoverImages: CoverImage[] = [
  {
    id: "kalamin-indhiya-kanavugal",
    fileName: "kalamin-indhiya-kanavugal.jpg",
    url: "/covers/kalamin-indhiya-kanavugal.jpg",
  },
  {
    id: "bhagavad-gitai",
    fileName: "bhagavad-gitai.jpg",
    url: "/covers/bhagavad-gitai.jpg",
  },
  {
    id: "siva-rama-krishnan",
    fileName: "siva-rama-krishnan.jpg",
    url: "/covers/siva-rama-krishnan.jpg",
  },
  {
    id: "upanayanam",
    fileName: "upanayanam.jpg",
    url: "/covers/upanayanam.jpg",
  },
  {
    id: "memories-never-die",
    fileName: "memories-never-die.jpg",
    url: "/covers/memories-never-die.jpg",
  },
  {
    id: "sri-sukthikal",
    fileName: "sri-sukthikal.jpg",
    url: "/covers/sri-sukthikal.jpg",
  },
  {
    id: "kalams-family-tree",
    fileName: "kalams-family-tree.jpg",
    url: "/covers/kalams-family-tree.jpg",
  },
  {
    id: "the-pallava-empire",
    fileName: "the-pallava-empire.jpg",
    url: "/covers/the-pallava-empire.jpg",
  },
];

export const coverImages: CoverImage[] = rawCoverImages.sort((a, b) =>
  a.fileName.localeCompare(b.fileName)
);