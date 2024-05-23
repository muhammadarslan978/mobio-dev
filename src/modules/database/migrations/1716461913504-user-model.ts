import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserModel1716461913504 implements MigrationInterface {
  name = 'UserModel1716461913504';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('Driver', 'Dispatcher', 'Organization', 'Admin')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_status_enum" AS ENUM('occupied', 'available')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_onboardingverified_enum" AS ENUM('Pending', 'Approved', 'Rejected')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "displayName" character varying NOT NULL, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "addressLineTwo" character varying NOT NULL, "postalCode" character varying NOT NULL, "city" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, "country" character varying NOT NULL, "activeCountry" character varying NOT NULL DEFAULT 'Netherlands', "activeCity" character varying NOT NULL, "companyName" character varying NOT NULL, "domain" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "block" boolean NOT NULL DEFAULT false, "lastLogin" character varying NOT NULL, "lat" character varying NOT NULL, "lng" character varying NOT NULL, "location" character varying NOT NULL, "status" "public"."user_status_enum" NOT NULL DEFAULT 'available', "IBAN" character varying NOT NULL, "onBoardingVerified" "public"."user_onboardingverified_enum" NOT NULL, "passwordRestToken" character varying NOT NULL, "passwordTokenExpire" TIMESTAMP WITH TIME ZONE NOT NULL, "online" boolean NOT NULL DEFAULT true, "locationTimeStamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "pushToken" character varying NOT NULL, CONSTRAINT "UQ_059e69c318702e93998f26d1528" UNIQUE ("displayName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_7b88529f0ea08f291b5a9275e8d" UNIQUE ("companyName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_059e69c318702e93998f26d152" ON "user" ("displayName") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7b88529f0ea08f291b5a9275e8" ON "user" ("companyName") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7b88529f0ea08f291b5a9275e8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_059e69c318702e93998f26d152"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(
      `DROP TYPE "public"."user_onboardingverified_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
