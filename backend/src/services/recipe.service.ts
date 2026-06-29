import { RecipeRepository } from '../repositories/recipe.repository';
import { AppError } from '../types/errors';
import { BaseRecipeDto } from '../types/recipe.types';

export const RecipeService = {
  async getAllRecipes() {
    const recipes = await RecipeRepository.findAll();

    return recipes;
  },

  async getRecipe(id: string) {
    const recipe = await RecipeRepository.findById(id);
    if (!recipe) throw new AppError('NO_SUCH_ENTITY', 404);

    return recipe;
  },

  async createRecipe(data: BaseRecipeDto, user_id: string) {},
};
