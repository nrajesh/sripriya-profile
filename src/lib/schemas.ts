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

export const coverImageSchema = z.object({
  id: z.string().optional(), // UUID for cover images
  fileName: z.string().min(1, "File name is required").regex(/^[\w\-. ]+\.(jpg|jpeg|png|gif|svg)$/i, "Must be a valid image file name (e.g., image.jpg)"),
  url: z.string().url("Must be a valid URL").min(1, "URL is required"),
});

export type CoverImageFormData = z.infer<typeof coverImageSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Must be a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;