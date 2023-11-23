create extension if not exists "uuid-ossp";

create type orderstatus as enum ('open', 'ordered')

create table carts (
	id uuid primary key default uuid_generate_v4(),
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status orderstatus
)

create table cart_items (
	cart_id uuid,
	product_id uuid,
	count integer,
	foreign key ("cart_id") references "carts" ("id")
)