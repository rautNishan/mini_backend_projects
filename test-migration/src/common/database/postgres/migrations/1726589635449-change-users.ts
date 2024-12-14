import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUsers1726589635449 implements MigrationInterface {
  name = 'ChangeUsers1726589635449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "user_type" TO "role"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."users_user_type_enum" RENAME TO "users_role_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."users_role_enum" RENAME TO "users_user_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "role" TO "user_type"`,
    );
  }
}
