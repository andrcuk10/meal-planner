import { AppDataSource } from '../config/database';
import { RecipeIngredient } from '../entities/RecipeIngredient';
import { Recipe } from '../entities/Recipe';
import { Ingredient } from '../entities/Ingredient';
import { BaseRecipeIngredient } from '../types/recipe.types';

export interface IRecipeIngredientsRepository {
  findById(id: string): Promise<RecipeIngredient | null>;
  create(
    data: BaseRecipeIngredient,
    recipe: Recipe,
    ingredient: Ingredient,
  ): Promise<RecipeIngredient>;
  update(recipeIng: RecipeIngredient): Promise<RecipeIngredient>;
  delete(recipeIng: RecipeIngredient): Promise<RecipeIngredient>;
}

const recipeIngredientRepo = AppDataSource.getRepository(RecipeIngredient);

export const recipeIngredintRepository: IRecipeIngredientsRepository = {
  async findById(id: string) {
    return recipeIngredientRepo.findOne({
      where: {
        id,
      },
      relations: {
        ingredient: true,
      },
    });
  },

  async create(data: BaseRecipeIngredient, recipe: Recipe, ingredient: Ingredient) {
    const recipeIngredient = recipeIngredientRepo.create({
      quantity: data.quantity,
      unit: data.unit,
      note: data.note,
    });

    recipeIngredient.recipe = recipe;
    recipeIngredient.ingredient = ingredient;

    return recipeIngredientRepo.save(recipeIngredient);
  },

  async update(recipeIng: RecipeIngredient) {
    return recipeIngredientRepo.save(recipeIng);
  },

  async delete(recipeIng: RecipeIngredient) {
    return recipeIngredientRepo.remove(recipeIng);
  },
};
