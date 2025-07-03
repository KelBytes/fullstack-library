import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().min(2, "Title is required").max(100, "Title is too long"),
  description: z.string().trim().min(10).max(1000, "Description is too long"),
  author: z.string().min(2).max(100, "Author name is too long"),
  genre: z.string().min(2).max(50, "Genre is too long"),
  rating: z.coerce
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i, "Cover color must be a valid"),
  videoUrl: z.string().trim(),
  summary: z
    .string()
    .trim()
    .min(10, "Summary must be at least 10 characters long"),
});
