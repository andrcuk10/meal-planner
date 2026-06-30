import { z } from 'zod';
import { IngredientSchema } from './ingredient.schema';
import { UnitMeasure } from '../entities/RecipeIngredient';

export const updateRecipeSchema = z.object({
  name: z.string().min(1).optional(),
  isPublic: z.boolean().optional(),
});

export const RecipeIngredientSchema = z.object({
  ingredient: IngredientSchema,
  quantity: z.number().positive(),
  unit: z.enum(UnitMeasure),
  note: z.string().min(1).optional(),
});

export const StepSchema = z.object({
  step_num: z.number().positive(),
  step_text: z.string().min(1),
});

export const createRecipeSchema = z.object({
  name: z.string().min(1),
  isPublic: z.boolean(),
  ingredients: z.array(RecipeIngredientSchema),
  steps: z.array(StepSchema),
});
