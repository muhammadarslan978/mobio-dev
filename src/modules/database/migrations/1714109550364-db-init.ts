import { MigrationInterface, QueryRunner } from "typeorm";

export class DbInit1714109550364 implements MigrationInterface {
    name = 'DbInit1714109550364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "isActive" boolean NOT NULL DEFAULT true, "isVerified" boolean NOT NULL DEFAULT true, "role" character varying NOT NULL DEFAULT 'User', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
