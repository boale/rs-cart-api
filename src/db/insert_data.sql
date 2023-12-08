-- Run this in db sql console before this script execution if it has no uuid-ossp extension
 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

BEGIN;
CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  status VARCHAR(10) CHECK (status IN ('OPEN', 'ORDERED'))
);
COMMIT;

BEGIN;
CREATE TABLE IF NOT EXISTS cart_items (
  cart_id UUID REFERENCES carts(id),
  product_id UUID,
  count INTEGER,
  PRIMARY KEY (cart_id, product_id)
);
COMMIT;

BEGIN;
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY,
  user_id UUID,
  cart_id UUID REFERENCES carts(id),
  payment JSON,
  delivery JSON,
  comments TEXT,
  status VARCHAR(255) CHECK (status IN ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED')),
  total NUMERIC(10, 2)
);
COMMIT;

BEGIN;
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  first_name TEXT,
  last_name TEXT
);
COMMIT;

DO $$
DECLARE
  cart_id_1 UUID;
  cart_id_2 UUID;
  user_id_1 UUID;
  user_id_2 UUID;
BEGIN
  cart_id_1 := uuid_generate_v4();
  cart_id_2 := uuid_generate_v4();
  user_id_1 := uuid_generate_v4();
  user_id_2 := uuid_generate_v4();
  INSERT INTO users (id, first_name, last_name)
  VALUES
    (user_id_1, 'Eloise', 'Winslow'),
    (user_id_2, 'Sebastian', 'Thornefield');
  COMMIT;
  INSERT INTO carts (id, user_id, created_at, updated_at, status)
  VALUES
    (cart_id_1, user_id_1, '2023-01-01', '2023-01-02', 'OPEN'),
    (cart_id_2, user_id_2, '2023-01-03', '2023-01-04', 'ORDERED');
  COMMIT;
  INSERT INTO cart_items (cart_id, product_id, count)
  VALUES
    (cart_id_1, 'f96f5064-1232-4bf9-b6f1-cde768cba378', 3),
    (cart_id_1, 'a51e85c7-51a7-4177-b7e7-2cf4412a7eae', 2),
    (cart_id_2, 'cc1c8d62-fdb9-4db2-86eb-4514a95d94f2', 1);
  COMMIT;
  INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total)
  VALUES
    (uuid_generate_v4(), user_id_1, cart_id_1, '{"method": "credit_card", "amount": 50}', '{"address": "123 Main St"}', 'No comments', 'PENDING', 50.00),
    (uuid_generate_v4(), user_id_2, cart_id_2, '{"method": "paypal", "amount": 75}', '{"address": "456 Oak St"}', 'Special instructions', 'PROCESSING', 75.00);
  COMMIT;
END $$;
