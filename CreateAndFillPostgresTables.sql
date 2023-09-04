create extension if not exists "uuid-ossp";

CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');
CREATE TYPE order_status AS ENUM ('OPEN','IN_PROGRESS', 'ORDERED');
CREATE TYPE user_account AS ENUM ('STANDARD','PREMIUM');


create table carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	created_at date not null default current_date,
    updated_at date not null default current_date,
	status cart_status NOT NULL DEFAULT 'OPEN'
);

create table cart_items (
	cart_id uuid,
	product_id uuid not null,
	count integer,
	foreign key(cart_id) references carts(id) ON DELETE cascade
);

insert into carts (user_id, updated_at) values ('a9a8e63f-9300-4af8-8377-d99db370eebe', current_date);
insert into carts (user_id, updated_at) values ('a9a8e63f-9300-4af8-8377-d99db370eebc', current_date);

insert into cart_items (cart_id, product_id, count) values ('328e6692-8524-4bf5-b017-601829f93bea','da724cab-c4b3-4243-9509-a6d60ca454a5', 1);
insert into cart_items (cart_id, product_id, count) values ('328e6692-8524-4bf5-b017-601829f93bea','da724cab-c4b3-4243-9509-a6d60ca454a7', 5);
insert into cart_items (cart_id, product_id, count) values ('328e6692-8524-4bf5-b017-601829f93bea','da724cab-c4b3-4243-9509-a6d60ca454a8', 2);

insert into cart_items (cart_id, product_id, count) values ('aa1b1612-eb3e-4443-bf50-1b9e8b126689','da724cab-c4b3-4243-9509-a6d60ca454a9', 3);

select * from carts;
select * from cart_items;


select product_id, count from cart_items where cart_id = (select id from carts where user_id = 'a9a8e63f-9300-4af8-8377-d99db370eebe');

insert into cart_items (product_id, count, cart_id) values ('aa43d886-40dd-43ba-8e34-db3ffb1f1389', 1, 'e65673ec-6974-45f7-b9a0-6d89c73f80ba') returning *;

delete from carts where user_id = 'a9a8e63f-9300-4af8-8377-d99db370eebe';

ALTER TABLE cart_items  DROP constraint gfhfghf;
ALTER TABLE cart_items ADD constraint fk_cart_id_carts_id foreign key(cart_id) REFERENCES carts(id) ON DELETE cascade;

create table orders (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	cart_id uuid,
	payment json NOT null default '{"type": "payment"}',
	delivery json NOT null default '{"type": "delivery"}',
	status cart_status NOT NULL DEFAULT 'OPEN',
	total decimal,
	foreign key(cart_id) references carts(id) ON DELETE cascade
);

ALTER TABLE orders ADD COLUMN comments text;
ALTER TABLE orders
  ALTER COLUMN status DROP DEFAULT,
  ALTER COLUMN status
    SET DATA TYPE order_status
    USING status::text::order_status,
  ALTER COLUMN status SET DEFAULT 'OPEN';


ALTER TABLE orders
  ALTER COLUMN status
    SET DATA TYPE order_status
    USING status::text::order_status;

insert into orders (user_id, cart_id, total) values ('a9a8e63f-9300-4af8-8377-d99db370eebe','328e6692-8524-4bf5-b017-601829f93bea', 10);
select * from orders;

UPDATE orders SET
        status = COALESCE(NULLIF('ORDERED', ''), status::text)::order_status,
        delivery = COALESCE(NULLIF('', '')::json, delivery),
        payment = COALESCE(NULLIF('', '')::json, payment)
        WHERE id = 'b4f25e5c-9d46-42cc-a5bc-8b0d8e0884a8';

create table users (
	id uuid not null default uuid_generate_v4() primary key,
	name varchar not null,
	email varchar,
	password varchar,
	account user_account NOT NULL DEFAULT 'STANDARD'
);

insert into users (name, email, password) values ('Lora Palmer','base@mail.com','temp');
insert into users (name, email, password) values ('Addis Abeba','adis@mail.com','password');
insert into users (name, email, password, account) values ('Fox Malder','sample@mail.com', 'qwerty', 'PREMIUM');
select * from users;

ALTER TABLE orders ADD constraint fk_user_id_users_id foreign key(user_id) REFERENCES users(id);
ALTER TABLE carts ADD constraint fk_user_id_users_id foreign key(user_id) REFERENCES users(id);

select * from users where id = 'a9a8e63f-9300-4af8-8377-d99db370eebe';




