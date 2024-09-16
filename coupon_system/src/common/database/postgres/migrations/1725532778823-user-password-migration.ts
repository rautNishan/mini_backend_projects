import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPasswordMigration1725532778823 implements MigrationInterface {
  name = 'UserPasswordMigration1725532778823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
  }
}
