create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	created_at date not null,
	updated_at date not null
);

CREATE EXTENSION if not exists "uuid-ossp";

create table cart_items (
	product_id uuid not null default uuid_generate_v4() primary key,
	count integer not null,
	cart_id uuid not null,
	foreign key (cart_id) references carts(id)
);

insert into carts (created_at, updated_at) values ('2022-11-20', '2022-11-20')

insert into cart_items (count, cart_id) values ('3', '07c90148-a4dc-40e4-810c-377f2b232a43')