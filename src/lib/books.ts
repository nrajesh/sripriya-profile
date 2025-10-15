export interface Book {
  id: number;
  title: string;
  coverUrl: string;
  detailsUrl: string | null;
  originalAuthors: string | null;
  publisher: string | null;
  publicationDate: string | null;
  pageCount: string | null;
  isbn: string | null;
  category: string;
  tags: string | null;
  description: string;
}

export const booksData: Book[] = [
  {
    id: 5,
    title: "ஸ்வாமி வேதாந்த தேஸிகனின் ஸ்ரீஸூக்திகள் ஒரு அறிமுகம்",
    coverUrl: "/covers/sri-sukthikal.jpg",
    detailsUrl: "https://sripriya.in",
    originalAuthors: null,
    publisher: "V.K.N. Enterprises, Mylapore",
    publicationDate: "September 25, 2023",
    pageCount: null,
    isbn: null,
    category: "Original Publication",
    tags: "religion, hinduism, India, scholar, guru, vedanta desikan, swamy, sri vaishnavism, ramanuja",
    description: "சுவாமி தேஸிகனின் 755 ஆவது திருநக்ஷத்ர மஹோத்ஸவத்தில் ஸ்ரீமத் ஆண்டவன் ஸ்ரீவராஹ மஹா தேசிகன் திருக்கரங்களால் ரிஷிகேஷ் ஆச்ரமத்தில் வெளியிடப்பட்டது. This book is not available to purchase online",
  },
];