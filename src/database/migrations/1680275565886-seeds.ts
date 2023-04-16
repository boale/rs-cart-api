import { MigrationInterface, QueryRunner } from 'typeorm';

export class seeds1680275565886 implements MigrationInterface {
  name = 'seeds1680275565886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO carts (id, user_id, created_at, updated_at) VALUES
    ('bccfa7b0-9c97-4eb7-8c1d-98dff07f20f7','4be94ecd-325d-41c4-8808-74a911b66f04', current_timestamp, current_timestamp),
    ('2e739390-fae8-4494-81fc-24856f06d6a3','f2aff210-7273-4ee8-93aa-d1008c3f530c', current_timestamp, current_timestamp),
    ('39525ab1-dfbb-4ef2-adb5-19236f276efc','742bbd32-5fb3-4d59-83f5-6f92f7ec5942', current_timestamp, current_timestamp),
    ('ceb21efb-0256-459d-b1cf-341aa897511e','0d104647-1bbf-4975-b5d5-31fed9e21726', current_timestamp, current_timestamp),
    ('2add2b79-cb5c-4eba-b869-513c680faeee','bd4076d4-27f2-4557-89e8-22a30f710c70', current_timestamp, current_timestamp),
    ('af968e10-087e-444e-ab1f-6bf327c64649','33594623-29d7-48ef-89ca-50977e07b903', current_timestamp, current_timestamp),
    ('7179698b-5468-42bc-8f6e-3272ba374f00','3c4cd8c6-462b-41ea-97aa-82ad6739b95b', current_timestamp, current_timestamp),
    ('3a90ce23-5705-4157-b73e-9638be6fb264','8b0d366a-78af-4b51-852d-6deaa89fa608', current_timestamp, current_timestamp),
    ('3e069fe5-195b-49d4-a1a6-fe531b9edf48','e8c9972a-a99b-4b99-88a4-3d5a1679c917', current_timestamp, current_timestamp),
    ('c73502e1-b991-4362-b01a-88a5c2b6a4d6','c388d6a0-e5ca-46d1-9022-c0eb3cc20c92', current_timestamp, current_timestamp);`);
    await queryRunner.query(`INSERT INTO cart_items (cart_id, product_id, count) VALUES
    ('bccfa7b0-9c97-4eb7-8c1d-98dff07f20f7','a202e7d1-e933-4ed6-a80e-7034c929fcd1', 1),
    ('2e739390-fae8-4494-81fc-24856f06d6a3','81d2130b-ceaf-434f-80df-66357ca39327', 1),
    ('39525ab1-dfbb-4ef2-adb5-19236f276efc','569f6165-c81d-4c1e-98ae-3af65ff444e5', 1),
    ('ceb21efb-0256-459d-b1cf-341aa897511e','41fa4ba0-ce41-488f-a4cb-9a8b736401da', 1),
    ('2add2b79-cb5c-4eba-b869-513c680faeee','df03777e-397c-4909-b865-2c95428d53af', 1),
    ('af968e10-087e-444e-ab1f-6bf327c64649','61e83e33-e4f8-4a32-80ac-8c1a147b5088', 1),
    ('7179698b-5468-42bc-8f6e-3272ba374f00','4a493ac9-5abc-457b-8f26-85bdcc8c7a5d', 1),
    ('3a90ce23-5705-4157-b73e-9638be6fb264','0a577da0-d55d-491a-9c67-5c66ef7086d1', 1),
    ('3e069fe5-195b-49d4-a1a6-fe531b9edf48','a1570ef5-de50-4d25-9dfc-160aee89dfd4', 1),
    ('c73502e1-b991-4362-b01a-88a5c2b6a4d6','97a3c50c-6404-4a8c-a261-d18df006b01b', 1);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM cart_items');
    await queryRunner.query('DELETE FROM carts');
  }
}
