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
    id: 1,
    title: "கலாம் ஐயாவின் குடும்ப மரம்",
    coverUrl: "/covers/kalams-family-tree.jpg",
    detailsUrl: "https://www.amazon.in/dp/B09ZJ4QY8C",
    originalAuthors: "A. P. J. Abdul Kalam, A. P. J. M. Nazema Maraikayar",
    publisher: "Manjul Publishing House",
    publicationDate: "May 5, 2022",
    pageCount: "112",
    isbn: "978-9390924782",
    category: "Translation",
    tags: "apj abdul kalam, family, biography, tamil, translation",
    description: "A translation of 'A Family Tree' by Dr. A.P.J. Abdul Kalam.",
  },
  {
    id: 2,
    title: "தலைகீழாக ஒரு ராஜா",
    coverUrl: "/covers/upside-down-king.jpg",
    detailsUrl: "https://www.amazon.in/dp/B07B4625B5",
    originalAuthors: "Sudha Murty",
    publisher: "Penguin Random House India",
    publicationDate: "February 20, 2018",
    pageCount: "152",
    isbn: "978-0143441875",
    category: "Translation",
    tags: "sudha murty, mythology, children, krishna, rama",
    description: "Tamil translation of Sudha Murty's 'The Upside-Down King: Unusual Tales about Rama and Krishna'.",
  },
  {
    id: 3,
    title: "நாக யக்ஞம்",
    coverUrl: "/covers/serpents-revenge.jpg",
    detailsUrl: "https://www.amazon.in/dp/B076H5W8CR",
    originalAuthors: "Sudha Murty",
    publisher: "Penguin Random House India",
    publicationDate: "October 10, 2017",
    pageCount: "184",
    isbn: "978-0143441868",
    category: "Translation",
    tags: "sudha murty, mahabharata, mythology, children",
    description: "Tamil translation of Sudha Murty's 'The Serpent's Revenge: Unusual Tales from the Mahabharata'.",
  },
  {
    id: 4,
    title: "வியத்தகு இந்தியக் கதைகள்",
    coverUrl: "/covers/incredible-indian-tales.jpg",
    detailsUrl: "https://www.amazon.in/dp/B08WCNY4D6",
    originalAuthors: "Multiple Authors",
    publisher: "Penguin Random House India",
    publicationDate: "February 10, 2021",
    pageCount: "248",
    isbn: "978-0143452109",
    category: "Translation",
    tags: "puffin, indian tales, mythology, folklore, children",
    description: "Tamil translation of 'The Puffin Book of Incredible Indian Tales'.",
  },
  {
    id: 5,
    title: "ஸ்வாமி வேதாந்த தேஸிகனின் ஸ்ரீஸூக்திகள் ஒரு அறிமுகம்",
    coverUrl: "/covers/sri-sukthikal.jpg",
    detailsUrl: null,
    originalAuthors: null,
    publisher: "V.K.N. Enterprises, Mylapore",
    publicationDate: "September 25, 2023",
    pageCount: null,
    isbn: null,
    category: "Original Publication",
    tags: "religion, hinduism, India, scholar, guru, vedanta desikan, swamy, sri vaishnavism, ramanuja",
    description: "சுவாமி தேஸிகனின் 755 ஆவது திருநக்ஷத்ர மஹோத்ஸவத்தில் ஸ்ரீமத் ஆண்டவன் ஸ்ரீவராஹ மஹா தேசிகன் திருக்கரங்களால் ரிஷிகேஷ் ஆச்ரமத்தில் வெளியிடப்பட்டது. This book is not available to purchase online.",
  },
];