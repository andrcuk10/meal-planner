import {
  createIngredient,
  deleteIngredient,
  getAllIngredients,
  getIngredientById,
  getIngredientByName,
  updateIngredient,
} from '../repositories/ingredient.repository';
import { AppError } from '../types/errors';
import { UpdateIngredientDto } from '../types/ingredient.types';

export const IngredientService = {
  async getIngredients() {
    const ingredients = await getAllIngredients();

    return ingredients;
  },

  async getIngredient(id: string) {
    const ingredient = await getIngredientById(id);
    if (!ingredient) throw new AppError('NO_SUCH_ENTITY', 404);

    return ingredient;
  },

  async createNewIngredient(name: string) {
    const existing = await getIngredientByName(name.toLowerCase());
    if (existing) throw new AppError('DUPLICATE_NAME', 409);

    const ingredient = await createIngredient({ name: name.toLowerCase() });

    return ingredient;
  },

  async changeIngredient(id: string, data: UpdateIngredientDto) {
    const ingredient = await getIngredientById(id);
    if (!ingredient) throw new AppError('NO_SUCH_ENTITY', 404);

    if (data.name) {
      const existingWithName = await getIngredientByName(data.name.toLowerCase());
      if (existingWithName && ingredient.id !== existingWithName.id)
        throw new AppError('DUPLICATE_NAME', 409);
      ingredient.name = data.name;
    }

    const updatedIngredient = await updateIngredient(ingredient);

    return updatedIngredient;
  },

  async removeIngredient(id: string) {
    const ingredient = await getIngredientById(id);
    if (!ingredient) throw new AppError('NO_SUCH_ENTITY', 404);

    await deleteIngredient(ingredient);
  },
};
