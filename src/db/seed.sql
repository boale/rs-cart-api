/*
DB Creation
create type cart_status as enum ('OPEN', 'ORDERED');

create table cart (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null default uuid_generate_v4(),
	created_at timestamp NOT NULL DEFAULT NOW(),
	updated_at timestamp NOT NULL DEFAULT NOW(),
	status cart_status
)


create extension if not exists "uuid-ossp";


create table cart_items (
	id uuid not null default uuid_generate_v4() primary key,
	cart_id uuid references cart(id) on delete cascade,
	product_id uuid,
	count int
)
*/


insert into cart (status) values ('OPEN');
insert into cart (status) values ('ORDERED');


select *
from cart c 


insert into cart_items (cart_id, product_id, count) 
values 
('f9a8a4f8-72f1-4208-9603-ba7f7690b309', 'd877833c-fac7-4edc-88b1-404ed43a5d14', 10),
('f9a8a4f8-72f1-4208-9603-ba7f7690b309', '561676d0-b167-4aad-9830-0c709459a389', 15),
('c41bafd6-027c-4f4c-87e1-af21008e533f', '6dc5be25-f5c3-4842-82b4-6ba3a27a5f61', 20),
('c41bafd6-027c-4f4c-87e1-af21008e533f', '50b27229-29e9-4346-ad6b-9d65027be54a', 25);


select *
from cart_items ci 