create table carts (
	id uuid,
    user_id uuid NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
	PRIMARY KEY (id)
);

create table cart_items (
    cart_id uuid,
    product_id uuid NOT NULL,
    count integer,
	FOREIGN KEY (cart_id) REFERENCES carts(id)
);

create table products (
	id uuid NOT NULL,
	title text,
	description text,
	price INT,
	FOREIGN KEY (id) REFERENCES cart_items(product_id)
);

create table orders (
    id uuid,
    user_id uuid,
    cart_id uuid,
    payment JSON,
    delivery JSON,
    comments text,
    status text,
    total INT,
	FOREIGN KEY (cart_id) REFERENCES carts(id)
);

create table users (
	id uuid NOT NULL,
	name text,
	email text,
	password text,
);