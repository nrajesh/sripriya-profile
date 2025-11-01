export interface Article {
  name: string;
  link: string;
  previewImageUrl?: string;
}

// You can easily add new articles to this list.
export const articlesData: Article[] = [
  {
    name: "Upanayanam – A Gentle Introduction (15 part series)",
    link: "https://www.prekshaa.in/upanayanam-gentle-introduction-part-1-tamil",
    previewImageUrl: "/covers/upanayanam.jpg",
  },
  {
    name: "The Great Women of Tamiḻakam (Part 1)",
    link: "https://www.prekshaa.in/the-value-of-sanskrit-learning-and-culture-part1",
    previewImageUrl: "/covers/hiriyanna-collage.jpg",
  },
  {
    name: "The Great Women of Tamiḻakam (Part 2)",
    link: "https://www.prekshaa.in/the-great-women-of-tamilakam-part-2-tamil",
  },
  {
    name: "A Bird's Eye View of the Rāmāyaṇa and the Mahābhārata",
    link: "https://www.prekshaa.in/a-birds-eye-view-of-the-ramayana-and-the-mahabharata-tamil",
  },
  {
    name: "The Story of the Gaṅgā",
    link: "https://www.prekshaa.in/the-story-of-the-ganga-tamil",
  },
];