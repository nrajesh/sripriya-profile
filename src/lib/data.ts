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
  { href: "/contact", label: "Contact" },
];

export const socialLinks = [
  { href: "https://twitter.com/sripriya", label: "Twitter", icon: "twitter" },
  { href: "https://instagram.com/sripriya", label: "Instagram", icon: "instagram" },
  { href: "https://linkedin.com/in/sripriya", label: "LinkedIn", icon: "linkedin" },
];

export const books: Book[] = [
  {
    id: "1", // Adding ID
    title: "Sri Sukthikal",
    originalAuthors: "Sripriya Srinivasan",
    publisher: "Sripriya Srinivasan",
    publicationDate: "2023",
    pageCount: "120",
    isbn: "978-81-953422-0-5",
    category: "Original Works",
    tags: "Tamil, Poetry, Spirituality",
    description: "Sri Sukthikal is a collection of spiritual poems that explore the divine essence of life. The poems are written in a simple yet profound manner, making them accessible to readers of all ages and backgrounds.",
    coverUrl: "/covers/sri-sukthikal.jpg",
    detailsUrl: "/books/sri-sukthikal",
  },
  // ... other books with IDs
];

export function parseDateForSorting(dateString: string): number {
  const date = new Date(dateString);
  return date.getTime();
}

export function getMinPublicationYear(): number {
  const years = books
    .map(book => book.publicationDate ? parseInt(book.publicationDate.split('-')[0]) : null)
    .filter(year => year !== null) as number[];
  return Math.min(...years);
}

export function getMaxPublicationYear(): number {
  const years = books
    .map(book => book.publicationDate ? parseInt(book.publicationDate.split('-')[0]) : null)
    .filter(year => year !== null) as number[];
  return Math.max(...years);
}