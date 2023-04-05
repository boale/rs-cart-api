CREATE TYPE IF NOT EXISTS status_enum AS ENUM ('OPEN', 'ORDERED');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS carts (
    id uuid primary key default uuid_generate_v4(),
	user_id uuid default uuid_generate_v4() NOT NULL,
	created_at date NOT NULL,
	updated_at date NOT NULL,
    status status_enum
)

CREATE TABLE IF NOT exists cart_items (
    cart_id uuid,
    product_id uuid,
    count integer,
    foreign key ("cart_id") references "carts" ("id")
)

insert into carts (created_at, updated_at, status) values
('2020-03-17 20:38:16', '2019-03-17 20:38:16', 'OPEN'),
('2021-03-17 20:38:16', '2022-03-17 20:38:16', 'ORDERED')

insert into cart_items (cart_id, product_id, count) values
('c576af09-0f05-4173-a84b-cc84ed237f04', '0dfc7add-e4ca-42db-88ac-45843b5ad028', 3),
('22caad52-01b4-4cae-9bde-ef2d025db2df', 'feec18df-bdd8-4e2a-903c-5a8e9597841d', 5)

delete from cart_items where product_id = '0dfc7add-e4ca-42db-88ac-45843b5ad028'

 CREATE TABLE IF NOT EXISTS orders (
	id uuid default uuid_generate_v4(),
	user_id uuid,
	cart_id uuid,
	payment json,
	delivery json,
	comments text,
  	status status_enum,
  	total integer,
    foreign key ("cart_id") references "carts" ("id")
)
