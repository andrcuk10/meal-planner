import { Request, Response, NextFunction } from 'express';
import { IngredientService } from '../services/ingredient.service';

export const IngredientController = {
  async getAllIngredients(req: Request, res: Response, next: NextFunction) {
    try {
      const ingredients = await IngredientService.getIngredients();
      res.status(200).json({ ingredients });
    } catch (error) {
      next(error);
    }
  },

  async getSingleIngredient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const ingredient = await IngredientService.getIngredient(id as string);
      res.status(200).json({ ingredient });
    } catch (error) {
      next(error);
    }
  },

  async createIngredient(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const createdIngredient = await IngredientService.createNewIngredient(name);
      res.status(201).json({ ingredient_id: createdIngredient.id });
    } catch (error) {
      next(error);
    }
  },

  async updateIngredient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const updatedIngredient = await IngredientService.changeIngredient(id as string, { name });
      res.status(200).json({ ingredient_id: updatedIngredient.id });
    } catch (error) {
      next(error);
    }
  },

  async deleteIngredient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await IngredientService.removeIngredient(id as string);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
