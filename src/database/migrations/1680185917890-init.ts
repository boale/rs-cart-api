import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1680185917890 implements MigrationInterface {
  name = 'init1680185917890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TABLE "cart_items"
       (
           "id"         uuid    NOT NULL DEFAULT uuid_generate_v4(),
           "product_id" uuid    NOT NULL,
           "count"      integer NOT NULL,
           "cart_id"    uuid,
           CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id")
       );`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts"
       (
           "id"         uuid      NOT NULL DEFAULT uuid_generate_v4(),
           "user_id"    uuid      NOT NULL,
           "created_at" TIMESTAMP NOT NULL DEFAULT now(),
           "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
           CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")
       );`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_items"
          ADD CONSTRAINT "FK_b6b2a4f1f533d89d218e70db941" FOREIGN KEY ("cart_id") REFERENCES "carts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT IF EXISTS "FK_b6b2a4f1f533d89d218e70db941"`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "carts"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "cart_items"`);
  }
}
