import { AppDataSource } from '../config/database';
import { Recipe } from '../entities/Recipe';
import { User } from '../entities/User';
import { CreateRecipeDto } from '../types/recipe.types';

export interface IRecipeRepository {
  findById(id: string): Promise<Recipe | null>;
  findAll(): Promise<Recipe[]>;
  create(data: CreateRecipeDto, author: User): Promise<Recipe>;
  update(recipe: Recipe): Promise<Recipe>;
  delete(recipe: Recipe): Promise<Recipe>;
}

const recipeRepo = AppDataSource.getRepository(Recipe);

export const RecipeRepository: IRecipeRepository = {
  async findAll() {
    return recipeRepo.find({
      select: {
        author: {
          id: true,
          username: true,
        },
      },
      relations: {
        author: true,
        steps: true,
        recipeIngredients: {
          ingredient: true,
        },
      },
    });
  },

  async findById(id: string) {
    return recipeRepo.findOne({
      where: { id },
      select: {
        author: {
          id: true,
          username: true,
        },
      },
      relations: {
        author: true,
        steps: true,
        recipeIngredients: {
          ingredient: true,
        },
      },
    });
  },

  async create(data: CreateRecipeDto, author: User) {
    const recipe = recipeRepo.create(data);
    recipe.author = author;

    return recipeRepo.save(recipe);
  },

  async update(recipe: Recipe) {
    return recipeRepo.save(recipe);
  },

  async delete(recipe: Recipe) {
    return recipeRepo.remove(recipe);
  },
};
