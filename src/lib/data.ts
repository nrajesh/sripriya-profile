import { Facebook, Twitter, Instagram, Mail, type LucideIcon } from "lucide-react";

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  publicationDate: string;
  publisher?: string;
  isbn?: string;
  tags?: string;
  originalAuthors?: string;
  buyLink?: string;
  category?: string; // Added for errors 7, 10, 11
  pageCount?: number; // Added for errors 8, 9
};

export type NavLink = {
  href: string;
  label: string;
};

export type SocialLink = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export const author = {
  name: "Sripriya Srinivasan",
  tagline: "Author and Translator",
  bio: "Sripriya Srinivasan is a celebrated author and translator known for her insightful works bridging cultures and languages.",
  profileImage: "/author-profile.jpeg",
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const socialLinks: SocialLink[] = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "mailto:sripriya@example.com", icon: Mail, label: "Email" },
];

export const parseDateForSorting = (dateString: string): number => {
  if (!dateString) return 0;
  return new Date(dateString).getTime();
};

export const getMinPublicationYear = (books: Book[]): number => {
  const years = books.map(book => book.publicationDate ? new Date(book.publicationDate).getFullYear() : 9999).filter(y => y !== 9999);
  return years.length > 0 ? Math.min(...years) : new Date().getFullYear();
};

export const getMaxPublicationYear = (books: Book[]): number => {
  const years = books.map(book => book.publicationDate ? new Date(book.publicationDate).getFullYear() : 0).filter(y => y !== 0);
  return years.length > 0 ? Math.max(...years) : new Date().getFullYear();
};


// Placeholder Data
export const books: Book[] = [
  {
    id: "b1",
    title: "The Silent Echo",
    author: author.name,
    description: "A gripping novel about memory and identity.",
    coverUrl: "/book-cover-1.jpg",
    publicationDate: "2023-10-15",
    publisher: "Penguin India",
    tags: "Fiction, Contemporary",
    buyLink: "https://example.com/buy/silent-echo",
    category: "Fiction",
    pageCount: 320,
  },
  {
    id: "b2",
    title: "Whispers of the Past",
    author: author.name,
    description: "A collection of short stories exploring historical themes.",
    coverUrl: "/book-cover-2.jpg",
    publicationDate: "2022-05-20",
    publisher: "HarperCollins",
    tags: "Short Stories, Historical",
    buyLink: "https://example.com/buy/whispers",
    category: "Short Stories",
    pageCount: 280,
  },
  {
    id: "b3",
    title: "A Translator's Journey",
    author: author.name,
    description: "Essays on the art and challenge of literary translation.",
    coverUrl: "/book-cover-3.jpg",
    publicationDate: "2021-11-01",
    publisher: "Rupa Publications",
    tags: "Non-Fiction, Essays",
    buyLink: "https://example.com/buy/journey",
    category: "Non-Fiction",
    pageCount: 190,
  },
];

export const translations: Book[] = [
  {
    id: "t1",
    title: "The River Flows (Translation)",
    author: author.name,
    originalAuthors: "Kalki Krishnamurthy",
    description: "Translation of a classic Tamil novel.",
    coverUrl: "/translation-cover-1.jpg",
    publicationDate: "2024-01-01",
    publisher: "Westland Books",
    tags: "Translation, Classic, Tamil",
    buyLink: "https://example.com/buy/river-flows",
    category: "Translation",
    pageCount: 450,
  },
  {
    id: "t2",
    title: "City Lights (Translation)",
    author: author.name,
    originalAuthors: "M. T. Vasudevan Nair",
    description: "A translation of a celebrated Malayalam work.",
    coverUrl: "/translation-cover-2.jpg",
    publicationDate: "2023-08-20",
    publisher: "Orient BlackSwan",
    tags: "Translation, Malayalam",
    buyLink: "https://example.com/buy/city-lights",
    category: "Translation",
    pageCount: 210,
  },
  {
    id: "t3",
    title: "The Mango Tree (Translation)",
    author: author.name,
    originalAuthors: "Premchand",
    description: "Translation of selected Hindi short stories.",
    coverUrl: "/translation-cover-3.jpg",
    publicationDate: "2022-03-10",
    publisher: "Penguin India",
    tags: "Translation, Hindi, Short Stories",
    buyLink: "https://example.com/buy/mango-tree",
    category: "Translation",
    pageCount: 150,
  },
  {
    id: "t4",
    title: "Voices from the South (Translation)",
    author: author.name,
    originalAuthors: "Various Authors",
    description: "An anthology of translated poetry from South India.",
    coverUrl: "/translation-cover-4.jpg",
    publicationDate: "2021-06-05",
    publisher: "Hachette India",
    tags: "Translation, Poetry, Anthology",
    buyLink: "https://example.com/buy/voices",
    category: "Translation",
    pageCount: 300,
  },
];