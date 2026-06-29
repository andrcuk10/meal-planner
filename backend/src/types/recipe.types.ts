import { UnitMeasure } from '../entities/RecipeIngredient';

export type BaseIngredientDto = { name: string };
export type IngredientDto = BaseIngredientDto & { ingredient_id: string };

export type BaseRecipeIngredient = {
  ingredient: { ingredient_id: string; name: string };
  quantity: number;
  unit: UnitMeasure;
  note?: string;
};
export type RecipeIngredientDto = BaseRecipeIngredient & { recipe_ingredient_id: string };

export type BaseStep = { step_num: number; step_text: string };
export type StepDto = BaseStep & { step_id: string; recipe_id: string };

export type BaseRecipeDto = CreateRecipeDto & {
  ingredients: BaseRecipeIngredient[];
  steps: BaseStep[];
};
export type RecipeDto = BaseRecipeDto & {
  recipe_id: string;
  creator: { user_id: string; username: string };
  createdAt: Date | string;
};

export type CreateRecipeDto = {
  name: string;
  isPublic: boolean;
};
