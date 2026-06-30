import { Router } from 'express';
import { RecipeController } from '../controllers/recipe.controller';
import { authenticate } from '../middleware/authenticate';
import { validate } from '../middleware/validate';
import { createRecipeSchema, updateRecipeSchema } from '../schemas/recipe.schema';

const router = Router();

router.get('/', RecipeController.getAllRecipes);
router.get('/:id', RecipeController.getRecipe);
router.post('/', authenticate, validate(createRecipeSchema), RecipeController.createRecipe);
router.patch('/:id', authenticate, validate(createRecipeSchema), RecipeController.updateRecipe);
router.delete('/:id', authenticate, RecipeController.deleteRecipe);

export default router;
