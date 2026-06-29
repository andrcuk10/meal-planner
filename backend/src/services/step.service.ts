import { RecipeRepository } from '../repositories/recipe.repository';
import { StepRepository } from '../repositories/step.repository';
import { AppError } from '../types/errors';
import { StepDto } from '../types/recipe.types';

export const StepService = {
  async updateStep(stepData: StepDto) {
    const recipe = await RecipeRepository.findById(stepData.recipe_id);
    if (!recipe) throw new AppError('NO_SUCH_ENTITY', 404);

    const existing = await StepRepository.findById(stepData.step_id);
    if (!existing) throw new AppError('NO_SUCH_ENTITY', 404);

    const freeNum = await StepRepository.findByNum(stepData.step_num, stepData.recipe_id);
    if (freeNum && existing.id !== freeNum.id) throw new AppError('TAKEN_STEP_NUM', 400);

    existing.step_num = stepData.step_num;
    existing.step_text = stepData.step_text;

    const updatedStep = await StepRepository.update(existing);

    return updatedStep;
  },

  async removeStep(step: StepDto) {
    const recipe = await RecipeRepository.findById(step.recipe_id);
    if (!recipe) throw new AppError('NO_SUCH_ENTITY', 404);

    const existing = await StepRepository.findById(step.step_id);
    if (!existing) throw new AppError('NO_SUCH_ENTITY', 404);

    await StepRepository.delete(existing);
  },
};
