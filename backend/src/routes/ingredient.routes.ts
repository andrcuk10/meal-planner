import { Router } from 'express';
import { IngredientController } from '../controllers/ingredient.controller';
import { validate } from '../middleware/validate';
import { createIngredientSchema, updateIngredientSchema } from '../schemas/ingredient.schema';

const router = Router();

router.get('/', IngredientController.getAllIngredients);
router.get('/:id', IngredientController.getSingleIngredient);
router.post('/', validate(createIngredientSchema), IngredientController.createIngredient);
router.patch('/:id', validate(updateIngredientSchema), IngredientController.updateIngredient);
router.delete('/:id', IngredientController.deleteIngredient);

export default router;
