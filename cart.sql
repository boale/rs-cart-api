CREATE TYPE card_status AS ENUM ('OPEN', 'ORDERED');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE carts (
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_id uuid NOT NULL,
   created_at DATE NOT NULL,
   updated_at DATE NOT NULL,
   status card_status,
   FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE cart_items (
   product_id uuid DEFAULT uuid_generate_v4(),
   cart_id uuid,
   count int,
   FOREIGN KEY (cart_id) REFERENCES carts (id)
   ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
(uuid_generate_v4(), uuid_generate_v4(), CURRENT_DATE, CURRENT_DATE, 'OPEN'),
(uuid_generate_v4(), uuid_generate_v4(), CURRENT_DATE, CURRENT_DATE, 'ORDERED');

WITH inserted_carts AS (
  SELECT id FROM carts ORDER BY created_at DESC LIMIT 2
)

INSERT INTO cart_items (product_id, cart_id, count) SELECT
uuid_generate_v4(),
inserted_carts.id,
CAST(RANDOM() * 10 + 1 AS INT)
FROM inserted_carts, generate_series(1,5);
