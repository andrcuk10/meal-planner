import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';

export enum UnitMeasure {
  TEASPOON = 'tsp.',
  TABLESPOON = 'tbsp.',
  CUP = 'cup',
  MILLILITER = 'ml',
  LITER = 'l',
  GRAM = 'gr',
  KILOGRAM = 'kg',
}

@Entity('recipes_ingredients')
export class RecipeIngredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ insert: false, update: false })
  recipe_id: string;

  @Column({ insert: false, update: false })
  ingredient_id: string;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: UnitMeasure,
  })
  unit: UnitMeasure;

  @Column({ nullable: true })
  note?: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}
