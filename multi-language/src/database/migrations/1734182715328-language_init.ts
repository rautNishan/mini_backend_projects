import { MigrationInterface, QueryRunner } from 'typeorm';

export class LanguageInit1734182715328 implements MigrationInterface {
  name = 'LanguageInit1734182715328';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "languages" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "language" character varying(100) NOT NULL, "language_code" character varying(100) NOT NULL, "native-name" character varying(100) NOT NULL, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "languages"`);
  }
}
