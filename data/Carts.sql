CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE cartstatus AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE IF NOT EXISTS carts (
  id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
  user_id uuid NOT null default uuid_generate_v4(),
  created_at date NOT NULL,
  updated_at date NOT NULL,
  status cartstatus
);

INSERT INTO carts (created_at, updated_at, status) VALUES 
  ('2023-04-08', '2023-04-08', 'OPEN'),
  ('2023-04-08', '2023-04-08', 'OPEN'),
  ('2023-04-08', '2023-04-08', 'ORDERED');
