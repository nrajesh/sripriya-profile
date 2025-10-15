import { Book } from "@/types/book";

export const author = {
  name: "Sripriya Srinivasan",
  tagline: "Author & Translator",
  bio: "Sripriya Srinivasan is a prolific author and translator, known for her works in Tamil literature. She has translated numerous works from English to Tamil and has also written original works in Tamil.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "/contact" },
];

export const socialLinks = [
  { href: "https://twitter.com/sripriya", label: "Twitter", icon: "twitter" },
  { href: "https://instagram.com/sripriya", label: "Instagram", icon: "instagram" },
  { href: "https://linkedin.com/in/sripriya", label: "LinkedIn", icon: "linkedin" },
];

export const books: Book[] = [
  {
    id: "1",
    title: "Sri Sukthikal",
    originalAuthors: "Sripriya Srinivasan",
    publisher: "Sripriya Srinivasan",
    publicationDate: "2023-01-15",
    pageCount: "120",
    isbn: "978-81-953422-0-5",
    category: "Original Works",
    tags: "Tamil, Poetry, Spirituality",
    description: "Sri Sukthikal is a collection of spiritual poems that explore the divine essence of life. The poems are written in a simple yet profound manner, making them accessible to readers of all ages and backgrounds.",
    coverUrl: "/covers/sri-sukthikal.jpg",
    detailsUrl: "/books/sri-sukthikal",
  },
  {
    id: "2",
    title: "The Translated Classic",
    originalAuthors: "Unknown Author",
    publisher: "Global Press",
    publicationDate: "2018-05-20",
    pageCount: "350",
    isbn: "978-1-234567-89-0",
    category: "Translations",
    tags: "English, Fiction, Historical",
    description: "A faithful translation of a timeless classic, bringing ancient wisdom to a modern audience.",
    coverUrl: "/covers/placeholder-translation.jpg",
    detailsUrl: null,
  },
  {
    id: "3",
    title: "Modern Tamil Short Stories",
    originalAuthors: "Various Authors",
    publisher: "Local Publisher",
    publicationDate: "2020-11-01",
    pageCount: "210",
    isbn: "978-0-987654-32-1",
    category: "Original Works",
    tags: "Tamil, Short Stories, Contemporary",
    description: "A compilation of compelling short stories reflecting contemporary life and culture in Tamil Nadu.",
    coverUrl: "/covers/placeholder-short-stories.jpg",
    detailsUrl: null,
  },
];

export function parseDateForSorting(dateString: string): number {
  // Ensure dateString is valid before creating Date object
  if (!dateString) return 0;
  const date = new Date(dateString);
  return date.getTime();
}

export function getMinPublicationYear(): number {
  const years = books
    .map(book => book.publicationDate ? parseInt(book.publicationDate.split('-')[0]) : null)
    .filter(year => year !== null) as number[];
  return years.length > 0 ? Math.min(...years) : new Date().getFullYear();
}

export function getMaxPublicationYear(): number {
  const years = books
    .map(book => book.publicationDate ? parseInt(book.publicationDate.split('-')[0]) : null)
    .filter(year => year !== null) as number[];
  return years.length > 0 ? Math.max(...years) : new Date().getFullYear();
}