import { MigrationInterface, QueryRunner } from "typeorm";

export class Company1716718668744 implements MigrationInterface {
    name = 'Company1716718668744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logo" character varying(255), "title" character varying(255) NOT NULL, "headerText" text, "socialLinks" json, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_879141ebc259b4c0544b3f1ea4" UNIQUE ("user_id"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fullName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "addressLineTwo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "postalCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phoneNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "activeCity" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "companyName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "domain" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastLogin" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lat" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lng" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "location" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "IBAN" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "onBoardingVerified" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "passwordRestToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "passwordTokenExpire" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "locationTimeStamp" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pushToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_879141ebc259b4c0544b3f1ea4c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_879141ebc259b4c0544b3f1ea4c"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pushToken" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "locationTimeStamp" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "passwordTokenExpire" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "passwordRestToken" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "onBoardingVerified" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "IBAN" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "location" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lng" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lat" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastLogin" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "domain" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "companyName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "activeCity" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "country" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phoneNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "postalCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "addressLineTwo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fullName" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
