import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecipeIngredietsTable1782637167230 implements MigrationInterface {
    name = 'CreateRecipeIngredietsTable1782637167230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."recipes_ingredients_unit_enum" AS ENUM('tsp.', 'tbsp.', 'cup', 'ml', 'l', 'gr', 'kg')`);
        await queryRunner.query(`CREATE TABLE "recipes_ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recipe_id" uuid NOT NULL, "ingredient_id" uuid NOT NULL, "quantity" integer NOT NULL, "unit" "public"."recipes_ingredients_unit_enum" NOT NULL, "note" character varying, CONSTRAINT "PK_128176fc97ba8afde4b0befd9ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "FK_aefbae9e2b77c3f192aff3bce2d" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "FK_38719bd7756e077181ceaf6e2ba" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "FK_38719bd7756e077181ceaf6e2ba"`);
        await queryRunner.query(`ALTER TABLE "recipes_ingredients" DROP CONSTRAINT "FK_aefbae9e2b77c3f192aff3bce2d"`);
        await queryRunner.query(`DROP TABLE "recipes_ingredients"`);
        await queryRunner.query(`DROP TYPE "public"."recipes_ingredients_unit_enum"`);
    }

}
