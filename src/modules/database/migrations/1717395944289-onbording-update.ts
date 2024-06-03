import { MigrationInterface, QueryRunner } from 'typeorm';

export class OnbordingUpdate1717395944289 implements MigrationInterface {
  name = 'OnbordingUpdate1717395944289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "onboarding" DROP CONSTRAINT "FK_74bc0704eb2e138a5a49333490a"`,
    );
    await queryRunner.query(`ALTER TABLE "onboarding" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "onboarding" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "onboarding" DROP COLUMN "insuranceExpiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" ADD "insuranceExpiry" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" DROP COLUMN "licenseExpiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" ADD "licenseExpiry" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" DROP COLUMN "vehicleCardExpiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" ADD "vehicleCardExpiry" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" ADD CONSTRAINT "FK_f2baf27f040b7c72a6d93a0cf9a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "onboarding" DROP CONSTRAINT "FK_f2baf27f040b7c72a6d93a0cf9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" DROP COLUMN "vehicleCardExpiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" ADD "vehicleCardExpiry" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" DROP COLUMN "licenseExpiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" ADD "licenseExpiry" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" DROP COLUMN "insuranceExpiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "onboarding" ADD "insuranceExpiry" date`,
    );
    await queryRunner.query(`ALTER TABLE "onboarding" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "onboarding" ADD "user_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "onboarding" ADD CONSTRAINT "FK_74bc0704eb2e138a5a49333490a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
