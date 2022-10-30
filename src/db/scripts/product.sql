create extension if not exists "uuid-ossp";

Create table "Product" (
  id uuid primary key default uuid_generate_v4(),
  title text NOT NULL,
  description text,
  price integer NOT NULL
);


INSERT INTO "Product" (id, title, description, price) VALUES (uuid_generate_v4(), 'Product 1', 'Product Description 1', 10);
INSERT INTO "Product" (id, title, description, price) VALUES (uuid_generate_v4(), 'Product 2', 'Product Description 2', 20);