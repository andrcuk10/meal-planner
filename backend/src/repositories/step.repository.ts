import { Step } from '../entities/Step';
import { Recipe } from '../entities/Recipe';
import { AppDataSource } from '../config/database';
import { BaseStep } from '../types/recipe.types';

export interface IStepRepository {
  findByNum(num: number, recipeId: string): Promise<Step | null>;
  findById(id: string): Promise<Step | null>;
  create(data: BaseStep, recipe: Recipe): Promise<Step>;
  update(step: Step): Promise<Step>;
  delete(step: Step): Promise<Step>;
}

const stepRepo = AppDataSource.getRepository(Step);

export const StepRepository: IStepRepository = {
  async findByNum(num: number, recipeId: string) {
    return stepRepo.findOne({
      where: {
        step_num: num,
        recipe: {
          id: recipeId,
        },
      },
    });
  },

  async findById(id: string) {
    return stepRepo.findOne({ where: { id } });
  },

  async create(data: BaseStep, recipe: Recipe) {
    const step = stepRepo.create(data);
    step.recipe = recipe;

    return stepRepo.save(step);
  },

  async update(step: Step) {
    return stepRepo.save(step);
  },

  async delete(step: Step) {
    return stepRepo.remove(step);
  },
};
