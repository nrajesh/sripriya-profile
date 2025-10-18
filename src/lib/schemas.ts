import { z } from "zod";

export const bookSchema = z.object({
  id: z.number().optional(), // ID is optional for new books, will be generated
  title: z.string().min(1, "Title is required"),
  coverUrl: z.string().url("Must be a valid URL").min(1, "Cover URL is required"),
  detailsUrl: z.string().url("Must be a valid URL").nullable().optional(),
  amazonUrl: z.string().url("Must be a valid URL").nullable().optional(),
  flipkartUrl: z.string().url("Must be a valid URL").nullable().optional(),
  originalAuthors: z.string().nullable().optional(),
  publisher: z.string().nullable().optional(),
  publicationDate: z.string().nullable().optional(),
  pageCount: z.string().nullable().optional(),
  isbn: z.string().nullable().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.string().nullable().optional(),
  description: z.string().min(1, "Description is required"),
});

export type BookFormData = z.infer<typeof bookSchema>;