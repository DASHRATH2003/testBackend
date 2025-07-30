import { z } from 'zod';

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  director: z.string().min(1, "Director is required"),
  budget: z.number().min(0, "Budget must be positive"),
  location: z.string().min(1, "Location is required"),
  duration: z.number().min(1, "Duration must be positive"),
  year: z.number().min(1900).max(new Date().getFullYear()),
  poster: z.string().optional(),
  type: z.literal('movie').default('movie'),
});

export type MovieInput = z.infer<typeof movieSchema>;

export const movieUpdateSchema = movieSchema.partial(); 