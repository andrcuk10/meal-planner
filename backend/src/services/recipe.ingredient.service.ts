import { getIngredientById } from '../repositories/ingredient.repository';
import { recipeIngredintRepository } from '../repositories/recipe.ingredient.repository';
import { RecipeRepository } from '../repositories/recipe.repository';
import { AppError } from '../types/errors';
import { RecipeIngredientDto } from '../types/recipe.types';

export const RecipeIngredientService = {
  async updateRecipeIngredient(recipeIngredient: Partial<RecipeIngredientDto>, recipeId: string) {
    const recipe = await RecipeRepository.findById(recipeId);
    if (!recipe) throw new AppError('NO_SUCH_ENTITY', 404);

    const existing = await recipeIngredintRepository.findById(
      recipeIngredient.recipe_ingredient_id as string,
    );
    if (!existing) throw new AppError('NO_SUCH_ENTITY', 404);

    if (recipeIngredient.ingredient) {
      const ingredient = await getIngredientById(recipeIngredient.ingredient.ingredient_id);
      if (!ingredient) throw new AppError('NO_SUCH_ENTITY', 404);

      existing.ingredient = ingredient;
    }
    if (recipeIngredient.quantity) existing.quantity = recipeIngredient.quantity;
    if (recipeIngredient.unit) existing.unit = recipeIngredient.unit;
    if (recipeIngredient.note) existing.note = recipeIngredient.note;

    const updatedRecipeIngredient = await recipeIngredintRepository.update(existing);

    return updatedRecipeIngredient;
  },

  async removeRecipeIngredient(recipeId: string, recipeIngredientId: string) {
    const recipe = await RecipeRepository.findById(recipeId);
    if (!recipe) throw new AppError('NO_SUCH_ENTITY', 404);

    const existing = await recipeIngredintRepository.findById(recipeIngredientId);
    if (!existing) throw new AppError('NO_SUCH_ENTITY', 404);

    await recipeIngredintRepository.delete(existing);
  },
};
