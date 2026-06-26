import { Router } from 'express';
import { IngredientController } from '../controllers/ingredient.controller';
import { validate } from '../middleware/validate';
import { createIngredientSchema, updateIngredientSchema } from '../schemas/ingredient.schema';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.get('/', authenticate, IngredientController.getAllIngredients);
router.get('/:id', authenticate, IngredientController.getSingleIngredient);
router.post(
  '/',
  authenticate,
  validate(createIngredientSchema),
  IngredientController.createIngredient,
);
router.patch(
  '/:id',
  authenticate,
  validate(updateIngredientSchema),
  IngredientController.updateIngredient,
);
router.delete('/:id', authenticate, IngredientController.deleteIngredient);

export default router;
