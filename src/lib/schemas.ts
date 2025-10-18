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
  imageFile: z.instanceof(File, { message: "An image file is required." })
    .optional() // Make it optional for initial form state
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, `Max image size is 5MB.`) // 5MB limit
    .refine(
      (file) => !file || ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type),
      "Only .jpg, .jpeg, .png, .gif, and .webp formats are supported."
    ),
});

// The type will now correctly infer imageFile?: File | undefined
export type CoverImageFormData = z.infer<typeof coverImageSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Must be a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;