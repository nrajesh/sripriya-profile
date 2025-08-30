import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const author = {
  name: "Sripriya Srinivasan",
  tagline: "Author & Translator",
  bio: "An accomplished author and translator, Sripriya Srinivasan brings rich narratives and profound ideas to a wider audience through her insightful works.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/books", label: "Books" },
  { href: "/contact", label: "Contact" },
];

export const socialLinks = [
  {
    href: "https://www.facebook.com/sripriya.srinivasan.940309",
    label: "Facebook",
    icon: Facebook,
  },
];

// Helper function to parse dates for sorting
const parseDateForSorting = (dateString: string): Date => {
  if (!dateString) return new Date(0); // Treat empty string as very old
  // Handle "Month Day, Year" format
  if (dateString.includes(',')) {
    return new Date(dateString);
  }
  // Handle "Year" format
  if (/^\d{4}$/.test(dateString)) {
    return new Date(`${dateString}-01-01`); // Assume Jan 1st for year-only dates
  }
  return new Date(dateString); // Fallback for other formats
};

const rawBooks = [
  {
    title: "கலாமின் இந்தியக் கனவுகள்",
    coverUrl: "/covers/kalamin-indhiya-kanavugal.jpg",
    detailsUrl: "https://www.noolulagam.com/product/?pid=34503",
    publisher: "கிழக்கு பதிப்பகம்",
    publicationDate: "July 01, 2017",
    pageCount: "280",
    isbn: "B07BJK8TFY (ASIN); 9788184937947 (ISBN)",
  },
  {
    title: "பகவத் கீதை தர்க்காலத் தமிழில்",
    coverUrl: "/covers/bhagavad-gitai.jpg",
    detailsUrl: "https://amzn.in/d/8E1f4BP",
    publisher: "CreateSpace Independent Publishing Platform",
    publicationDate: "September 11, 2017",
    pageCount: "340",
    isbn: "9781976284601 (ISBN-13); 1976284600 (ISBN-10)",
  },
  {
    title: "சிவ-ராம-கிருஷ்ணன்",
    coverUrl: "/covers/siva-rama-krishnan.jpg",
    detailsUrl: "https://amzn.in/d/3p2s24Y",
    publisher: "Prekshaa Pratishtana",
    publicationDate: "April 21, 2021",
    pageCount: "10 part series",
    isbn: "B0936ZXLX7 (ASIN)",
  },
  {
    title: "உபநயனம் – ஒரு எளிய அறிமுகம்",
    coverUrl: "/covers/upanayanam.jpg",
    detailsUrl: "https://www.prekshaa.in/archive?field_preksha_series_tid=7139",
    publisher: "Prekshaa Pratishtana",
    publicationDate: "March 02, 2019",
    pageCount: "15 part series",
    isbn: null,
  },
  {
    title: "ஸ்வாமி வேதாந்த தேசிகனின் ஸ்ரீஸூக்திகள் – ஒரு அறிமுகம்",
    coverUrl: "https://placehold.co/400x600/222/FFF?text=Cover",
    detailsUrl: null,
    publisher: "",
    publicationDate: "",
    pageCount: "",
    isbn: null,
  },
  {
    title: "Memories Never Die",
    coverUrl: "/covers/memories-never-die.jpg",
    detailsUrl: "https://www.prabhatbooks.com/dr-a-p-j-abdul-kalam-memories-never-die-english-translation-of-ninaivugalukku-maranamillai.htm",
    publisher: "Prabhat Prakashan",
    publicationDate: "April 08, 2023",
    pageCount: "456",
    isbn: "9788196159078 (ISBN); B0C2YTW8SR (ASIN)",
  },
  {
    title: "Kalam’s Family Tree",
    coverUrl: "/covers/kalams-family-tree.jpg",
    detailsUrl: "https://www.prabhatbooks.com/kalam-s-family-tree-ancestral-legacy-of-dr-a-p-j-abdul-kalam.htm",
    publisher: "Prabhat Prakashan",
    publicationDate: "April 10, 2024",
    pageCount: "160",
    isbn: "9789355628121 (ISBN); B0D1CNDBZC (ASIN)",
  },
  {
    title: "The Pallava Empire",
    coverUrl: "/covers/the-pallava-empire.jpg",
    detailsUrl: "https://sahityabooks.com/shop/rashtrotthana-sahitya/the-pallava-empire/",
    publisher: "Rashtrotthana Sahitya",
    publicationDate: "June 19, 2025",
    pageCount: null,
    isbn: "9789393991423 (ISBN)",
    description: "Along with the Colas, Ceras, and Pandyas, the Pallavas were among the most important dynasties that ruled over the Tamil heartland. Who were the Pallavas? Where did they come from? What was their administration like? In what ways did they contribute to the heritage of Bharata?\n\nThe Pallava Empire : A Gentle Introduction offers a broad overview of the political, social, cultural, and economic landscape that prevailed during Pallava rule spanning 600 years, from 3rd to 9th century C.E. This book is written in an eminently readable style keeping in mind a general audience.",
  },
];

// Sort books by publication date, most recent first
export const books = rawBooks.sort((a, b) => {
  const dateA = parseDateForSorting(a.publicationDate);
  const dateB = parseDateForSorting(b.publicationDate);
  return dateB.getTime() - dateA.getTime();
});