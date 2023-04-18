--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--CREATE TYPE Status AS ENUM ('OPEN', 'ORDERED');

--create table if not exists carts (
--   id uuid not null default uuid_generate_v4() primary key,
--   user_id uuid not null,
--   created_at date not null,
--   updated_at date not null,
--   status Status
-- )
 
select * from carts;

--create table if not exists cart_items (
--	cart_id uuid not null,
--	product_id uuid not null,
--	count integer not null,
--	foreign key (cart_id) references carts(id)
--)


--insert into carts (user_id, created_at, updated_at, status) values 
--('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2023-04-08', '2023-04-08', 'OPEN'); 
--
--delete from carts 
--where user_id = '30344c8c-b53d-487a-beb0-2133907bef88';
--
--insert into cart_items (cart_id, product_id, count) values (
--	'b7c801f0-0878-442b-8893-0fb4f60b08e9', '30344c8c-b53d-487a-beb0-2133907bef88', 1
--);
--
--


create table if not exists orders (
   id uuid not null default uuid_generate_v4() primary key,
   user_id uuid not null,
   cart_id uuid not null,
   payment json,
   delivery json,
   comments text,
   status text,
   total integer,
   foreign key (cart_id) references carts(id)
);


select * from carts;
--select * from cart_items;
--select * from orders;