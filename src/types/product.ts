import { z } from 'zod';


export const productSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().min(0),
  origin: z.string(),
  age: z.number().int().min(0),
  weight: z.number().min(0),
  length: z.number().min(0),
  species: z.string(),
  color: z.string(),
  feedingVolumn: z.string(),
  filterRate: z.number().min(0),
  gender: z.number().min(0).max(1, { message: "Gender must be 0 (Female) or 1 (Male)" }),
  categoryId: z.string()
});

