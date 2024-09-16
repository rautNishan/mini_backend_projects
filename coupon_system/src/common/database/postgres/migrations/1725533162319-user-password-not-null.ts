import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserPasswordNotNull1725533162319 implements MigrationInterface {
  name = 'UserPasswordNotNull1725533162319';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`,
    );
  }
}
