import { Home, BookOpen, User, Rss, Mail, Twitter, Linkedin, Instagram } from "lucide-react";

// Define the Book type based on usage across the application
export type Book = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
  author: string;
  publicationDate: string;
  publisher?: string;
  isbn?: string;
  tags?: string;
  originalAuthors?: string;
  category?: string;
  pageCount?: number;
  
  // New purchase links
  detailsUrl?: string;
  amazonUrl?: string;
  flipkartUrl?: string;
};

// Define the Author type
export type Author = {
  name: string;
  tagline: string;
  bio: string;
  profileImage: string;
};

// New types for navigation and social links
export type NavLink = {
  title: string;
  href: string;
};

export type SocialLink = {
  name: string;
  href: string;
  icon: any; // Represents a Lucide React component
};

// Utility function used for sorting
export const parseDateForSorting = (dateString: string | undefined): number => {
  if (!dateString) return 0;
  const date = new Date(dateString);
  return date.getTime();
};

// New utility functions for books/years
export const getMinPublicationYear = (bookList: Book[]): number => {
  const years = bookList
    .map(book => book.publicationDate ? new Date(book.publicationDate).getFullYear() : null)
    .filter((year): year is number => year !== null);
  return years.length > 0 ? Math.min(...years) : new Date().getFullYear();
};

export const getMaxPublicationYear = (bookList: Book[]): number => {
  const years = bookList
    .map(book => book.publicationDate ? new Date(book.publicationDate).getFullYear() : null)
    .filter((year): year is number => year !== null);
  return years.length > 0 ? Math.max(...years) : new Date().getFullYear();
};

// --- Data Arrays ---

export const author: Author = {
  name: "Sripriya Srinivasan",
  tagline: "Author and Translator",
  bio: "A placeholder bio.",
  profileImage: "/author-profile.jpeg",
};

export const navLinks: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "Books", href: "/books" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Instagram", href: "#", icon: Instagram },
];

const placeholderBook: Book = {
  id: "placeholder-1",
  title: "Placeholder Book",
  coverUrl: "/placeholder-cover.jpg",
  description: "This is a placeholder book description.",
  author: "Sripriya Srinivasan",
  publicationDate: "2023-01-01",
  publisher: "Placeholder Press",
  category: "Fiction",
  detailsUrl: "#",
  amazonUrl: "#",
  flipkartUrl: "#",
  pageCount: 300,
};

export const books: Book[] = [
  { ...placeholderBook, id: "b1", title: "Book 1" },
  { ...placeholderBook, id: "b2", title: "Book 2" },
  { ...placeholderBook, id: "b3", title: "Book 3" },
];
export const translations: Book[] = [
  { ...placeholderBook, id: "t1", title: "Translation 1", category: "Translation" },
  { ...placeholderBook, id: "t2", title: "Translation 2", category: "Translation" },
  { ...placeholderBook, id: "t3", title: "Translation 3", category: "Translation" },
  { ...placeholderBook, id: "t4", title: "Translation 4", category: "Translation" },
];