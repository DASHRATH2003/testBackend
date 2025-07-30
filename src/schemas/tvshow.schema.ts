import { z } from 'zod';

export const tvShowSchema = z.object({
  title: z.string().min(1, "Title is required"),
  director: z.string().min(1, "Director is required"),
  budget: z.number().min(0, "Budget must be positive"),
  location: z.string().min(1, "Location is required"),
  duration: z.number().min(1, "Duration must be positive"),
  startYear: z.number().min(1900).max(new Date().getFullYear()),
  endYear: z.number().min(1900).max(new Date().getFullYear()).optional(),
  poster: z.string().optional(),
  type: z.literal('tvshow').default('tvshow'),
});

export type TVShowInput = z.infer<typeof tvShowSchema>;

export const tvShowUpdateSchema = tvShowSchema.partial(); 