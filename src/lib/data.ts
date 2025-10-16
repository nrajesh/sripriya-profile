import { BookOpen, Home, PenTool, Rss, Users } from "lucide-react";

// --- Core Types ---

export type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export type SocialLink = {
  href: string;
  icon: React.ElementType;
  label: string;
};

export type Author = {
  name: string;
  bio: string;
  profileImage: string;
  tagline: string; // Added tagline
};

export type Book = {
  title: string;
  coverUrl: string;
  detailsUrl: string | null;
  amazonUrl?: string | null;
  flipkartUrl?: string | null;
  author: string; // Author of the book (could be Sripriya or original author if translation)
  description: string;
  isbn?: string | null;
  publicationDate?: string | null;
  
  // Fields required by book-search and books/page
  category?: string | null;
  tags?: string | null;
  publisher?: string | null;
  originalAuthors?: string | null; // Used for translations
  pageCount?: number | null;
};

// --- Data ---

export const author: Author = {
  name: "Sripriya Srinivasan",
  bio: "Sripriya Srinivasan is an acclaimed author and translator, known for her insightful narratives and elegant translations.",
  profileImage: "/author-profile.jpeg",
  tagline: "Author, Translator, and Literary Enthusiast.", // Added placeholder tagline
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/books", label: "Books & Translations", icon: BookOpen },
  { href: "/blog", label: "Blog", icon: Rss },
  { href: "/about", label: "About", icon: Users },
  { href: "/contact", label: "Contact", icon: PenTool },
];

export const socialLinks: SocialLink[] = [
  { href: "https://twitter.com/sripriya", icon: Home, label: "Twitter" },
  { href: "https://linkedin.com/in/sripriya", icon: Home, label: "LinkedIn" },
];

export const books: Book[] = [
  {
    title: "The First Book",
    coverUrl: "/book-cover-1.jpg",
    detailsUrl: "https://publisher.com/book1",
    amazonUrl: "https://amazon.in/book1",
    author: "Sripriya Srinivasan",
    description: "A compelling narrative about life and translation.",
    publicationDate: "2023-01-15",
    category: "Fiction",
    tags: "novel, contemporary",
    publisher: "Penguin India",
    pageCount: 320,
  },
  {
    title: "A Translated Work",
    coverUrl: "/book-cover-2.jpg",
    detailsUrl: null,
    flipkartUrl: "https://flipkart.com/translated",
    author: "Sripriya Srinivasan (Translator)",
    description: "An elegant translation of a classic text.",
    isbn: "978-1234567890",
    publicationDate: "2021-11-01",
    category: "Translation",
    tags: "classic, literature",
    publisher: "HarperCollins",
    originalAuthors: "Original Author A",
    pageCount: 450,
  },
  {
    title: "Short Stories Collection",
    coverUrl: "/book-cover-3.jpg",
    detailsUrl: "https://publisher.com/stories",
    author: "Sripriya Srinivasan",
    description: "A collection of insightful short stories.",
    publicationDate: "2024-05-10",
    category: "Short Stories",
    tags: "fiction, collection",
    publisher: "Rupa Publications",
    pageCount: 200,
  },
];

export const translations: Book[] = [
  {
    title: "The Translated Classic",
    coverUrl: "/translation-cover-1.jpg",
    detailsUrl: "https://publisher.com/classic",
    author: "Sripriya Srinivasan (Translator)",
    description: "A masterful translation by Sripriya Srinivasan.",
    publicationDate: "2022-05-20",
    category: "Translation",
    tags: "classic, poetry",
    publisher: "Oxford University Press",
    originalAuthors: "Original Author B",
    pageCount: 180,
  }
];

// --- Utility Functions ---

/**
 * Parses a date string (YYYY-MM-DD) into a sortable format (e.g., YYYYMMDD).
 * Returns 0 if the date is invalid or missing.
 */
export const parseDateForSorting = (dateString?: string | null): number => {
  if (!dateString) return 0;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 0;
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return parseInt(`${year}${month}${day}`, 10);
};

/**
 * Gets the minimum publication year from the list of books.
 */
export const getMinPublicationYear = (bookList: Book[]): number => {
  const years = bookList
    .map(book => book.publicationDate ? new Date(book.publicationDate).getFullYear() : null)
    .filter((year): year is number => year !== null);
  
  return years.length > 0 ? Math.min(...years) : new Date().getFullYear();
};

/**
 * Gets the maximum publication year from the list of books.
 */
export const getMaxPublicationYear = (bookList: Book[]): number => {
  const years = bookList
    .map(book => book.publicationDate ? new Date(book.publicationDate).getFullYear() : null)
    .filter((year): year is number => year !== null);
  
  return years.length > 0 ? Math.max(...years) : new Date().getFullYear();
};