import { z } from 'zod';

export const createIngredientSchema = z.object({
  name: z.string().min(1),
});

export const updateIngredientSchema = createIngredientSchema.partial();
