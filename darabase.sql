create table carts (
  id uuid not null primary key,
  created_at date not null,
  updated_at date not null
);

create table cart_items (
  cart_id uuid not null primary key,
  product_id uuid not null,
  count integer not null,
  foreign key (cart_id) references carts(id)
);

insert into carts (id, created_at, updated_at) values ('7567ec4b-b10c-48c5-9345-fc73c48a80a0', '2022-11-19 13:52:00', '2022-11-19 13:52:00');
insert into carts (id, created_at, updated_at) values ('3467ec4b-b10c-45c5-9345-fc73c48a80d4', '2022-11-19 13:52:00', '2022-11-19 13:52:00');
insert into carts (id, created_at, updated_at) values ('8267ec4b-b10c-48c5-9345-fc73c48a80a8', '2022-11-19 13:52:00', '2022-11-19 13:52:00');

insert into cart_items (cart_id, product_id, count) values ('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 'a27cfcb2-928a-4242-b939-1d2cf391d935', 2);
insert into cart_items (cart_id, product_id, count) values ('3467ec4b-b10c-45c5-9345-fc73c48a80d4', '60445fe6-1e19-4a90-bd44-97b48983d0f7', 1);
insert into cart_items (cart_id, product_id, count) values ('8267ec4b-b10c-48c5-9345-fc73c48a80a8', '7567ec4b-b10c-48c5-9345-fc73c48a80aa', 5);
