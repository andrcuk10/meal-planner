import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Recipe } from './Recipe';

@Entity('steps')
@Unique('uq_steps_step_num_recipe', ['step_num', 'recipe'])
export class Step {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  step_num: number;

  @Column()
  step_text: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps, { onDelete: 'CASCADE' })
  recipe: Recipe;
}
