import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1781588982755 implements MigrationInterface {
    name = 'InitialSchema1781588982755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subject" ("subject_id" SERIAL NOT NULL, "subject_name" character varying(100) NOT NULL, CONSTRAINT "UQ_b0b10a282b4bd41912aaaa53908" UNIQUE ("subject_name"), CONSTRAINT "PK_70fbdd4144f3fc91373a93fe04a" PRIMARY KEY ("subject_id"))`);
        await queryRunner.query(`CREATE TABLE "subject_result" ("id" SERIAL NOT NULL, "total_marks" integer NOT NULL, "obtained_marks" integer NOT NULL, "result_id" integer, "subject_id" integer, CONSTRAINT "CHK_89dda76f7407c40b276e2c244b" CHECK ("obtained_marks" <= "total_marks"), CONSTRAINT "PK_41fbfc8b5a63af2f00c73073995" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "result" ("result_id" SERIAL NOT NULL, "student_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_294c0344ffc38b392ed06a9cba2" UNIQUE ("student_id"), CONSTRAINT "PK_fcaa5b94aa1634896f0052e18a8" PRIMARY KEY ("result_id"))`);
        await queryRunner.query(`ALTER TABLE "subject_result" ADD CONSTRAINT "FK_266c1189773f4ecac445e22485f" FOREIGN KEY ("result_id") REFERENCES "result"("result_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_result" ADD CONSTRAINT "FK_dcd1954dbe97ac8f3a0b8fc8fc7" FOREIGN KEY ("subject_id") REFERENCES "subject"("subject_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subject_result" DROP CONSTRAINT "FK_dcd1954dbe97ac8f3a0b8fc8fc7"`);
        await queryRunner.query(`ALTER TABLE "subject_result" DROP CONSTRAINT "FK_266c1189773f4ecac445e22485f"`);
        await queryRunner.query(`DROP TABLE "result"`);
        await queryRunner.query(`DROP TABLE "subject_result"`);
        await queryRunner.query(`DROP TABLE "subject"`);
    }

}
