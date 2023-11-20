create extension if not exists "uuid-ossp";

CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');

create table if not exists carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	created_at date not null default current_date,
	updated_at date not null default current_date,
	status cart_status not null default 'OPEN'
);

create table if not exists cart_items (
	cart_id uuid,
	product_id uuid not null,
	count integer,
	foreign key(cart_id) references carts(id) ON DELETE cascade
);

create table users (
	id uuid primary key default uuid_generate_v4(),
	name text not null,
	email text,
	password text
);

create table orders (
	id uuid primary key default uuid_generate_v4(),
	user_id uuid not null,
	cart_id uuid not null,
	payment json,
	delivery json,
	comments text,
	status text,
	total integer,
	foreign key ("cart_id") references "carts" ("id") ON DELETE cascade
);

insert into carts (id, user_id, created_at, updated_at, status)
values (
    '40e6215d-b5c6-4896-987c-f30f3678f608',
	'40e62153-b5c6-4896-987c-f30f3678f608',
	'2023-12-01',
	'2024-12-01',
	'OPEN'
),
(
    '40e6215d-b5c6-4896-987c-f30f3678f607',
	'fefd3976-b4ed-4351-b4d7-ac974d278992',
	'2023-12-01',
	'2024-12-01',
	'OPEN'
),
(
    '6ecd8c99-4036-403d-bf84-cf8400f67836',
	'5ecd8c99-4036-403d-bf84-cf8400f67836',
	'2023-12-01',
	'2024-12-01',
	'ORDERED'
),
(
    '3f333df6-90a4-4fda-8dd3-9485d27cee36',
	'7f333df6-90a4-4fda-8dd3-9485d27cee36',
	'2023-12-01',
	'2024-12-01',
	'OPEN'
);

insert into cart_items (cart_id, product_id, count)
values (
    '40e6215d-b5c6-4896-987c-f30f3678f608',
	'40e62153-b5c6-4896-987c-f30f3678f608',
	1
),
(
    '6ecd8c99-4036-403d-bf84-cf8400f67836',
	'5ecd8c99-4036-403d-bf84-cf8400f67836',
	2
),
(
    '3f333df6-90a4-4fda-8dd3-9485d27cee36',
	'7f333df6-90a4-4fda-8dd3-9485d27cee36',
	3
);

insert into users (name, email, password) values
('mykhailosheliahov', 'admin@gmail.com', 'TEST_PASSWORD');