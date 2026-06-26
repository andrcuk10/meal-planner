import { AppDataSource } from '../config/database';
import { Ingredient } from '../entities/Ingredient';

const ingredientRepo = AppDataSource.getRepository(Ingredient);

export const getAllIngredients = () => {
  return ingredientRepo.find();
};

export const getIngredientById = (id: string) => {
  return ingredientRepo.findOne({ where: { id } });
};

export const getIngredientByName = (name: string) => {
  return ingredientRepo.findOne({ where: { name } });
};

export const createIngredient = (data: Partial<Ingredient>) => {
  const ingredient = ingredientRepo.create(data);
  return ingredientRepo.save(ingredient);
};

export const updateIngredient = (ingredient: Ingredient) => {
  return ingredientRepo.save(ingredient);
};

export const deleteIngredient = (ingredient: Ingredient) => {
  return ingredientRepo.remove(ingredient);
};
