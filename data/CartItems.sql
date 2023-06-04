CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS cart_items (
  cart_id uuid NOT NULL REFERENCES carts(id),
  product_id uuid NOT NULL DEFAULT uuid_generate_v4(),
  count integer
);

  INSERT INTO cart_items (cart_id, count) VALUES 
  ('27c1866b-3eae-4047-8f67-f95b602a79f6', 2),
  ('ca109c21-7645-421a-8dae-a0a851646fc3', 1),
  ('3f7ab203-aca5-4321-bb1f-5fd58f07f23f', 3);
