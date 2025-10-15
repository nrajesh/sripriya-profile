export interface Book {
  id: string; // Adding the id field as a string
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