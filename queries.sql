create table carts (
	id uuid not null primary key,
	created_at date not null,
	updated_at date not null,
	status statuses not null
);

create type statuses as enum ('OPEN', 'ORDERED');

create table products (
	id uuid not null primary key,
	title varchar(255) not null,
	description varchar not null,
	price decimal(5,2) not null
);

create table users (
	id uuid not null primary key,
	name varchar(255) not null,
	email varchar(255) not null,
	password varchar(255) not null
)

create table cartItem (
	count integer not null
);

alter table cartItem add column cart_id uuid references carts;
alter table cartItem add column product_id uuid references products;
alter table carts add column user_id uuid references users;

insert into products (id, title, description, price) values ('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 'ProductOne', 'Short Product Description1', 24);
insert into products (id, title, description, price) values ('619ae557-6147-45b0-b4d3-08d4c5b54547', 'product_4_new', 'about_product_4_new', 67);
insert into products (id, title, description, price) values ('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 'Product2', 'Short Product Descriptio1', 23);

insert into carts (id, created_at, updated_at, status) values ('7567ec4b-b10c-48c5-4565-fc73c48a80aa', '2024-05-20T10:21:31.503Z', '2024-05-20T10:21:31.503Z', 'OPEN');
insert into carts (id, created_at, updated_at, status) values ('619ae557-b10c-48c5-b4d3-fc73c48a80aa', '2024-05-20T10:21:31.503Z', '2024-05-20T10:21:31.503Z', 'OPEN');
insert into carts (id, created_at, updated_at, status) values ('7567ec4b-b10c-48c5-9445-fc73c48a80a2', '2024-05-20T10:21:31.503Z', '2024-05-20T10:21:31.503Z', 'OPEN');

insert into cartItem (cart_id, product_id, count) values ('7567ec4b-b10c-48c5-4565-fc73c48a80aa', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 2);

insert into users (id, name, email, password) values ('619ae557-b10c-48c5-c6d2-fc73c48a80aa', 'testUser', 'test@gmail.com', 'test_pass');

update carts set user_id = '619ae557-b10c-48c5-c6d2-fc73c48a80aa' where id = '7567ec4b-b10c-48c5-4565-fc73c48a80aa';
update carts set user_id = '619ae557-b10c-48c5-c6d2-fc73c48a80aa' where id = '619ae557-b10c-48c5-b4d3-fc73c48a80aa';
update carts set user_id = '619ae557-b10c-48c5-c6d2-fc73c48a80aa' where id = '7567ec4b-b10c-48c5-9445-fc73c48a80a2'