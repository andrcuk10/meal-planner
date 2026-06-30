import { AppDataSource } from '../config/database';
import { Recipe } from '../entities/Recipe';
import { RecipeIngredient } from '../entities/RecipeIngredient';
import { Step } from '../entities/Step';
import { RecipeRepository } from '../repositories/recipe.repository';
import { AppError } from '../types/errors';
import { BaseRecipeDto, CreateRecipeDto } from '../types/recipe.types';

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

  async updateRecipe(id: string, data: Partial<CreateRecipeDto>, user_id: string) {
    const recipe = await RecipeRepository.findById(id);
    if (!recipe) throw new AppError('NO_SUCH_ENTITY', 404);

    if (recipe.author.id !== user_id) throw new AppError('NOT_YOURS', 403);

    if (data.isPublic !== undefined) recipe.isPublic = data.isPublic;
    if (data.name) recipe.name = data.name;

    const savedRecipe = await RecipeRepository.update(recipe);
    return savedRecipe;
  },

  async deleteRecipe(id: string, user_id: string) {
    const recipe = await RecipeRepository.findById(id);
    if (!recipe) throw new AppError('NO_SUCH_ENTITY', 404);

    if (recipe.author.id !== user_id) throw new AppError('NOT_YOURS', 403);

    await RecipeRepository.delete(recipe);
  },

  async createRecipe(data: BaseRecipeDto, user_id: string) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const recipe = queryRunner.manager.create(Recipe, {
        name: data.name,
        isPublic: data.isPublic,
        author: { id: user_id },
      });

      const savedRecipe = await queryRunner.manager.save(recipe);

      const steps = data.steps.map((s) =>
        queryRunner.manager.create(Step, {
          step_num: s.step_num,
          step_text: s.step_text,
          recipe: { id: savedRecipe.id },
        }),
      );
      await queryRunner.manager.save(steps);

      const recipeIngredients = data.ingredients.map((i) =>
        queryRunner.manager.create(RecipeIngredient, {
          quantity: i.quantity,
          unit: i.unit,
          note: i.note,
          recipe: { id: savedRecipe.id },
          ingredient: { id: i.ingredient.ingredient_id },
        }),
      );
      await queryRunner.manager.save(recipeIngredients);

      await queryRunner.commitTransaction();
      return savedRecipe;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  },
};
