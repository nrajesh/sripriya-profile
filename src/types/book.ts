export interface Book {
  title: string;
  originalAuthors?: string;
  publisher?: string;
  publicationDate?: string;
  pageCount?: string;
  isbn?: string;
  category?: string;
  tags?: string;
  description?: string;
  coverUrl: string;
  detailsUrl: string;
}