export interface Article {
  name: string;
  link: string;
  previewImageUrl?: string;
}

// You can easily add new articles to this list.
export const articlesData: Article[] = [
  {
    name: "சிவ-ராம-கிருஷ்ணன்: மூன்று தத்துவங்கள்",
    link: "https://www.prekshaa.in/%E0%AE%9A%E0%AE%BF%E0%AE%B5-%E0%AE%B0%E0%AE%BE%E0%AE%AE-%E0%AE%95%E0%AE%BF%E0%AE%B0%E0%AF%81%E0%AE%B7%E0%AF%8D%E0%AE%A3%E0%AE%A9%E0%AF%8D-%E0%AE%AE%E0%AF%82%E0%AE%A9%E0%AF%8D%E0%AE%B1%E0%AF%81-%E0%AE%A4%E0%AE%A4%E0%AF%8D%E0%AE%A4%E0%AF%81%E0%AE%B5%E0%AE%99%E0%AF%8D%E0%AE%95%E0%AE%B3%E0%AF%8D",
    previewImageUrl: "/covers/shiva.jpg",
  },
  {
    name: "உபநயனம் – ஒரு எளிய அறிமுகம் (முகவுரை)",
    link: "https://www.prekshaa.in/upanayanam-part1-mugavurai",
    previewImageUrl: "/covers/upanayanam.jpg",
  },
  {
    name: "சமஸ்கிருதம் கற்றலும் நம் கலாச்சாரத்தின் மதிப்பும் (பகுதி 1)",
    link: "https://www.prekshaa.in/the-value-of-sanskrit-learning-and-culture-part1",
    previewImageUrl: "/covers/hiriyanna-collage.jpg",
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