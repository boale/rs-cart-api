CREATE TABLE "public"."carts"
(
    "id"         uuid NOT NULL,
    "user_id"    uuid NOT NULL,
    "created_at" date NOT NULL,
    "updated_at" date NOT NULL,
    CONSTRAINT "carts_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "carts_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
)
;
CREATE TABLE "public"."cart_items"
(
    "cart_id"    uuid NOT NULL,
    "product_id" uuid NOT NULL,
    "count"      int4 NOT NULL,
    CONSTRAINT "FK_cart_id" FOREIGN KEY ("cart_id") REFERENCES "public"."carts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
)
;
CREATE TABLE "public"."orders"
(
    "id"       uuid                                NOT NULL,
    "user_id"  uuid                                NOT NULL,
    "cart_id"  uuid                                NOT NULL,
    "payment"  json                                NOT NULL,
    "delivery" json                                NOT NULL,
    "comment"  text COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::text,
    "status"   text COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::text,
    "total"    numeric                             NOT NULL DEFAULT 0,
    CONSTRAINT "orders_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "orders_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "orders_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
)
;
CREATE TABLE "public"."users"
(
    "id"       uuid NOT NULL,
    "username" varchar(255) COLLATE "pg_catalog"."default",
    "password" varchar(255) COLLATE "pg_catalog"."default",
    "email"    varchar(255) COLLATE "pg_catalog"."default",
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
)
;
