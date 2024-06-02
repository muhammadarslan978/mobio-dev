import { MigrationInterface, QueryRunner } from "typeorm";

export class UserModelUpdate1717340194967 implements MigrationInterface {
    name = 'UserModelUpdate1717340194967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLogin" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLogin" character varying`);
    }

}
