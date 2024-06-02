import { MigrationInterface, QueryRunner } from "typeorm";

export class Onboring1717354546616 implements MigrationInterface {
    name = 'Onboring1717354546616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."onboarding_verify_enum" AS ENUM('Pending', 'Approved', 'Rejected')`);
        await queryRunner.query(`CREATE TABLE "onboarding" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "numberPlate" character varying, "insuranceExpiry" date, "insuranceImage" character varying, "licenseExpiry" date, "licenseFront" character varying, "licenseBack" character varying, "vehicleCardExpiry" date, "vehicleCardFront" character varying, "vehicleCardBack" character varying, "pictureFront" character varying, "pictureBack" character varying, "pictureSide" character varying, "verify" "public"."onboarding_verify_enum", "isCurrent" boolean NOT NULL DEFAULT false, "user_id" uuid, CONSTRAINT "PK_b8b6cfe63674aaee17874f033cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "onboarding" ADD CONSTRAINT "FK_74bc0704eb2e138a5a49333490a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "onboarding" DROP CONSTRAINT "FK_74bc0704eb2e138a5a49333490a"`);
        await queryRunner.query(`DROP TABLE "onboarding"`);
        await queryRunner.query(`DROP TYPE "public"."onboarding_verify_enum"`);
    }

}
