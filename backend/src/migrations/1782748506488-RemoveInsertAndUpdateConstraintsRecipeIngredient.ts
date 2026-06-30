import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveInsertAndUpdateConstraintsRecipeIngredient1782748506488 implements MigrationInterface {
    name = 'RemoveInsertAndUpdateConstraintsRecipeIngredient1782748506488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "FK_aefbae9e2b77c3f192aff3bce2d"`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "FK_38719bd7756e077181ceaf6e2ba"`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ALTER COLUMN "recipe_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ALTER COLUMN "ingredient_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "FK_aefbae9e2b77c3f192aff3bce2d" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "FK_38719bd7756e077181ceaf6e2ba" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "FK_38719bd7756e077181ceaf6e2ba"`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "FK_aefbae9e2b77c3f192aff3bce2d"`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ALTER COLUMN "ingredient_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ALTER COLUMN "recipe_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "FK_38719bd7756e077181ceaf6e2ba" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "FK_aefbae9e2b77c3f192aff3bce2d" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
