import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintStepNumRecipe1782657949752 implements MigrationInterface {
    name = 'AddUniqueConstraintStepNumRecipe1782657949752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "uq_steps_step_num_recipe" UNIQUE ("step_num", "recipeId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "uq_steps_step_num_recipe"`);
    }

}
