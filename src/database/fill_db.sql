-- run step by step

/* 1: Users */

DROP TABLE IF EXISTS "users" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table if not exists users (
	id uuid primary key not null default uuid_generate_v4(),
	name varchar ( 100 ) unique not null,
	email varchar ( 250 ) unique not null,
	password varchar ( 30 ) not null
);

insert into users (name, email, password)
values ('nandx-user1', 'user1@gmail.com', 'TEST_PASSWORD'),
	   ('nandx-user2', 'user2@gmail.com', 'TEST_PASSWORD'),
	   ('nandx-user3', 'user3@gmail.com', 'TEST_PASSWORD'),
	   ('nandx-user4', 'user4@gmail.com', 'TEST_PASSWORD'),
	   ('nandx-user5', 'user5@gmail.com', 'TEST_PASSWORD'),
	   ('nandx-user6', 'user6@gmail.com', 'TEST_PASSWORD'),
	   ('nandx-user7', 'user7@gmail.com', 'TEST_PASSWORD');


/* 2: Cart */

DROP TABLE IF EXISTS "carts" CASCADE;

DROP TYPE IF EXISTS "carts_status_enum" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "carts_status_enum" AS ENUM('OPEN', 'ORDERED');

CREATE TABLE "carts"
(
    "id"         uuid                NOT NULL DEFAULT uuid_generate_v4(),
    "user_id"    uuid,
    "created_at" TIMESTAMP           NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP           NOT NULL DEFAULT now(),
    "status"     "carts_status_enum" NOT NULL,
    CONSTRAINT "carts_id_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "carts"
    ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


INSERT INTO "carts"("user_id", "status")
SELECT (SELECT id
        FROM "users"
        WHERE name = 'nandx-user1'),
       'OPEN'
;

INSERT INTO "carts"("user_id", "status")
SELECT (SELECT id
        FROM "users"
        WHERE name = 'nandx-user3'),
       'OPEN'
;

INSERT INTO "carts"("user_id", "status")
SELECT (SELECT id
        FROM "users"
        WHERE name = 'nandx-user5'),
       'ORDERED'
;



/* 5: Orders */

DROP TABLE IF EXISTS "orders" CASCADE;

DROP TYPE IF EXISTS "orders_status_enum" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "public"."orders_status_enum" AS ENUM('OPEN', 'APPROVED', 'CONFIRMED', 'SENT', 'COMPLETED', 'CANCELLED');

CREATE TABLE "orders"
(
    "id"       uuid                 NOT NULL DEFAULT uuid_generate_v4(),
    "cart_id"  uuid,
    "user_id"  uuid,
    "payment"  jsonb                NOT NULL,
    "delivery" jsonb                NOT NULL,
    "comments" text,
    "status"   "orders_status_enum" NOT NULL,
    "total"    integer              NOT NULL,
    CONSTRAINT "orders_cart_id_key" UNIQUE ("cart_id"),
    CONSTRAINT "orders_id_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "orders"
    ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "orders"
    ADD CONSTRAINT "orders_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

   
INSERT INTO "orders"("cart_id", "user_id", "payment", "delivery", "comments", "status", "total")
SELECT (SELECT id FROM carts WHERE status = 'OPEN' LIMIT 1),
       (SELECT id FROM "users" WHERE name = 'nandx-user2'),
       '{"type":"card","address":"11 Street st.","creditCart":"1111"}',
       '{"type":"default","address":"11 Street st."}',
       '',
       'CONFIRMED',
       33;
      
INSERT INTO "orders"("cart_id", "user_id", "payment", "delivery", "comments", "status", "total")
SELECT (SELECT id FROM carts WHERE status = 'ORDERED' LIMIT 1),
       (SELECT id FROM "users" WHERE name = 'nandx-user1'),
       '{"type":"card","address":"11 Street st.","creditCart":"1111"}',
       '{"type":"default","address":"11 Street st."}',
       '',
       'CONFIRMED',
       33;

/* 2: Products */

DROP TABLE IF EXISTS "products" CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "products"
(
    "id"          uuid    NOT NULL DEFAULT uuid_generate_v4(),
    "title"       text    NOT NULL,
    "description" text    NOT NULL,
    "price"       integer NOT NULL,
    CONSTRAINT "products_id_pkey" PRIMARY KEY ("id")
);

INSERT INTO "products" ("title", "description", "price")
values ('product-1','product description 1', 5),
('product-2','product description 2', 15),
('product-3','product description 3', 25),
('product-4','product description 4', 35),
('product-5','product description 5', 45),
('product-6','product description 6', 5);

/* 4: cart items */


DROP TABLE IF EXISTS "cart_items" CASCADE;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "cart_items"
(
    "cart_id"    uuid    NOT NULL,
    "product_id" uuid    NOT NULL,
    "count"      integer NOT NULL,
    CONSTRAINT "cart_items_cart_id_product_id_pkey" PRIMARY KEY ("cart_id", "product_id")
);

ALTER TABLE "cart_items"
    ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "cart_items"
    ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;



INSERT INTO "cart_items"("cart_id", "product_id", "count")
SELECT (SELECT id FROM carts WHERE status = 'OPEN' LIMIT 1),
       (SELECT id FROM products where title = 'product-1'),
       1;
       
INSERT INTO "cart_items"("cart_id", "product_id", "count")
SELECT (SELECT id FROM carts WHERE status = 'ORDERED' LIMIT 1),
       (SELECT id FROM products where title = 'product-3'),
       1;
       
INSERT INTO "cart_items"("cart_id", "product_id", "count")
SELECT (SELECT id FROM carts WHERE status = 'ORDERED' LIMIT 1),
       (SELECT id FROM products where title = 'product-4'),
       3;