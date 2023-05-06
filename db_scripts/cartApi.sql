create type cartstatus as enum ('OPEN', 'ORDERED');

create table carts (
	id uuid primary key not null,
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status cartstatus not null
);

create table cart_items (
	id uuid not null primary key,
	cart_id uuid references carts(id),
	product_id uuid,
	count integer
);

create table orders (
  id uuid not null primary key,
  user_id uuid,
  cart_id uuid references carts(id),
  payment json,
  delivery json,
  comments text,
  status cartstatus,
  total INT
);

create table users (
  id uuid not null primary key,
  name text not null,
  email text not null,
  password text not null
);

insert into carts (id, user_id, created_at, updated_at, status) values
(gen_random_uuid(), gen_random_uuid(), '2023-05-06', '2023-05-16', 'OPEN'),
(gen_random_uuid(), gen_random_uuid(), '2023-04-06', '2023-04-16',  'ORDERED'),
(gen_random_uuid(), gen_random_uuid(), '2023-03-06', '2023-03-16',  'OPEN'),
(gen_random_uuid(), gen_random_uuid(), '2023-02-06', '2023-02-16',  'ORDERED');

insert into cart_items (id, cart_id, product_id, count) values
(gen_random_uuid(), '3a28e4e8-4800-4cb9-8f3b-fdd404fa09ce', gen_random_uuid(), 10),
(gen_random_uuid(), '3c41f9f8-7caa-4faa-b371-8711260e7a5a', gen_random_uuid(), 20),
(gen_random_uuid(), '8cae31c1-925c-43c7-b0ef-cecad22b80b2', gen_random_uuid(), 30),
(gen_random_uuid(), 'd4450dd5-6da8-4c24-8226-54ca2b7e25e7', gen_random_uuid(), 40);

insert into users(id, name, email, password) values 
(gen_random_uuid(), 'user1', 'user1@gmail.com', '123456'),
(gen_random_uuid(), 'user2', 'user2@gmail.com', '123456');

insert into orders(id, user_id, cart_id, status, total) values 
(gen_random_uuid(), '66d87d9d-2032-4216-b899-71ed2bd97d5f', '3c41f9f8-7caa-4faa-b371-8711260e7a5a', 'ORDERED', 123);