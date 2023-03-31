create type status_enum AS ENUM ('OPEN', 'ORDERED');
create table IF NOT EXISTS carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null default uuid_generate_v4(),
	created_at date not null,
	updated_at date not null,
	status status_enum
);

create table IF NOT EXISTS cart_items (
	product_id uuid,
	count integer
);

alter table cart_items
add column cart_id uuid
REFERENCES carts(id)