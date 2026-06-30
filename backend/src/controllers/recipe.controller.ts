import { Request, Response, NextFunction } from 'express';
import { RecipeService } from '../services/recipe.service';

export const RecipeController = {
  async getAllRecipes(req: Request, res: Response, next: NextFunction) {
    try {
      const recipes = await RecipeService.getAllRecipes();
      res.status(200).json({ recipes });
    } catch (error) {
      next(error);
    }
  },

  async getRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const recipe = await RecipeService.getRecipe(id as string);
      res.status(200).json({ recipe });
    } catch (error) {
      next(error);
    }
  },

  async updateRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, isPublic, steps, ingredients } = req.body;

      const recipe = await RecipeService.updateRecipe(
        id as string,
        { name, isPublic, ingredients, steps },
        req.userId as string,
      );
      res.status(200).json({ recipe_id: recipe.id });
    } catch (error) {
      next(error);
    }
  },

  async deleteRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await RecipeService.deleteRecipe(id as string, req.userId as string);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async createRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = req.userId;
      const { name, isPublic, ingredients, steps } = req.body;

      const createdRecipe = await RecipeService.createRecipe(
        {
          name,
          isPublic,
          ingredients,
          steps,
        },
        user_id as string,
      );

      res.status(201).json({ recipe_id: createdRecipe.id });
    } catch (error) {
      next(error);
    }
  },
};
