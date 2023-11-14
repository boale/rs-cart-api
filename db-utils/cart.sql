create type cart_status as enum ('OPEN', 'ORDERED');

create table carts (
	id uuid primary key not null,
	user_id uuid not null,
	created_at date not null,
	updated_at date not null,
	status cart_status not null
);

create table cart_items (
	id uuid not null primary key,
	cart_id uuid references carts(id),
	product_id uuid,
	count integer
);


insert into carts (id, user_id, created_at, updated_at, status) values
(gen_random_uuid(), gen_random_uuid(), '2023-11-13', '2023-11-13', 'ORDERED'),
(gen_random_uuid(), gen_random_uuid(), '2023-11-13', '2023-11-13',  'ORDERED'),
(gen_random_uuid(), gen_random_uuid(), '2023-11-13', '2023-11-13',  'OPEN'),
(gen_random_uuid(), gen_random_uuid(), '2023-11-13', '2023-11-13',  'OPEN');

insert into cart_items (id, cart_id, product_id, count) values
(gen_random_uuid(), 'd4a5ce44-825a-11ee-b962-0242ac120002', gen_random_uuid(), 2),
(gen_random_uuid(), 'e3e780b4-825a-11ee-b962-0242ac120002', gen_random_uuid(), 5),
(gen_random_uuid(), 'e904a8a6-825a-11ee-b962-0242ac120002', gen_random_uuid(), 4),
(gen_random_uuid(), 'f821b86a-825a-11ee-b962-0242ac120002', gen_random_uuid(), 18);
