create type status_enum as enum('OPEN', 'ORDERED')

create table if not exists carts (
	id uuid primary key default uuid_generate_v4(),
	user_id uuid not null,
	create_at date not null,
	updated_at date not null,
	status status_enum
)

create table if not exists cart_items (
	cart_id uuid,
	product_id uuid,
	count int,
	foreign key ("cart_id") references "carts" ("id")
)



create extension if not exists "uuid-ossp"

INSERT INTO carts (user_id, create_at, updated_at, status) VALUES ('d14948df-10fd-4c9b-9ce7-a172ded73eef', NOW(), NOW(), 'OPEN')

INSERT INTO carts (user_id, create_at, updated_at, status) VALUES ('d14948df-10fd-4c9b-9ce7-a172ded73eef', NOW(), NOW(), 'ORDERED')

insert  into cart_items (cart_id, product_id, count) values ('3fe85486-5b43-4851-8071-98e19db05d29', '8e115e6c-e57b-46cc-9957-b7a0fb839331' ,20)

insert into cart_items (cart_id, product_id, count) values ('3fe85486-5b43-4851-8071-98e19db05d29', '5258ad21-c3ec-482a-9f2a-525268dd94e3',  10)