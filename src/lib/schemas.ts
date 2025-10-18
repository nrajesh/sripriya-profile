import { z } from "zod";

export const bookSchema = z.object({
  id: z.number().optional(), // ID is optional for new books, will be generated
  title: z.string().min(1, "Title is required"),
  coverUrl: z.string().or(z.literal('')).nullable().optional(), // Removed .url() validation
  detailsUrl: z.string().url("Must be a valid URL").or(z.literal('')).nullable().optional(), // Allow empty string for detailsUrl
  amazonUrl: z.string().url("Must be a valid URL").or(z.literal('')).nullable().optional(), // Allow empty string for amazonUrl
  flipkartUrl: z.string().url("Must be a valid URL").or(z.literal('')).nullable().optional(), // Allow empty string for flipkartUrl
  originalAuthors: z.string().nullable().optional(),
  publisher: z.string().nullable().optional(),
  publicationDate: z.string().nullable().optional(),
  pageCount: z.string().nullable().optional(),
  isbn: z.string().nullable().optional(),
  category: z.string().optional(), // Now optional, will be derived
  tags: z.string().min(1, "Tags are required (comma-separated)"), // Made mandatory
  description: z.string().min(1, "Description is required"), // Made mandatory
});

export type BookFormData = z.infer<typeof bookSchema>;