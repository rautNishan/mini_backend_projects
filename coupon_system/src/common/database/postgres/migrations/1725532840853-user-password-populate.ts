import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPasswordPopulate1725532840853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "users" SET "password" = 'Default' WHERE "password" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "users" SET "password" = NULL WHERE "password" = 'Default'`,
    );
  }
}
