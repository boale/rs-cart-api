CREATE TABLE
    "user" (
        "id" uuid PRIMARY KEY,
        "name" text NOT NULL
    );

CREATE TABLE
    "cart" (
        "id" uuid PRIMARY KEY,
        "user_id" uuid NOT NULL,
        "created_at" timestamp NOT NULL,
        "updated_at" timestamp NOT NULL,
        "status" varchar NOT NULL,
        FOREIGN KEY ("user_id") REFERENCES "user"("id")
    );

CREATE TABLE
    "cart_item" (
        "id" uuid PRIMARY KEY,
        "product_id" uuid NOT NULL,
        "count" numeric NOT NULL,
        "cart_id" uuid NOT NULL,
        FOREIGN KEY ("cart_id") REFERENCES "cart"("id")
    );

CREATE TABLE
    "order" (
        "id" uuid PRIMARY KEY,
        "user_id" uuid NOT NULL,
        "cart_id" uuid NOT NULL,
        "payment" json,
        "delivery" json,
        "comments" text,
        "status" text NOT NULL,
        "total" numeric NOT NULL,
        FOREIGN KEY ("user_id") REFERENCES "user"("id"),
        FOREIGN KEY ("cart_id") REFERENCES "cart"("id")
    );

ALTER TABLE "cart"
ADD
    CONSTRAINT "FK_cart_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "cart_item"
ADD
    CONSTRAINT "FK_cart_item_cart_id" FOREIGN KEY ("cart_id") REFERENCES "cart"("id");

ALTER TABLE "order"
ADD
    CONSTRAINT "FK_order_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "order"
ADD
    CONSTRAINT "FK_order_cart_id" FOREIGN KEY ("cart_id") REFERENCES "cart"("id");

-- Insert two users

INSERT INTO
    "user" ("id", "name")
VALUES (
        '1d5e5a8a-1234-5678-90ab-cdef01234567',
        'John Doe'
    ), (
        '2d5e5a8a-1234-5678-90ab-cdef01234567',
        'Jane Doe'
    );

-- Insert two carts, one for each user

INSERT INTO
    "cart" (
        "id",
        "user_id",
        "created_at",
        "updated_at",
        "status"
    )
VALUES (
        '3d5e5a8a-1234-5678-90ab-cdef01234567',
        '1d5e5a8a-1234-5678-90ab-cdef01234567',
        NOW(),
        NOW(),
        'OPEN'
    ), (
        '4d5e5a8a-1234-5678-90ab-cdef01234567',
        '2d5e5a8a-1234-5678-90ab-cdef01234567',
        NOW(),
        NOW(),
        'OPEN'
    );

-- Insert two cart items, one for each cart

INSERT INTO
    "cart_item" (
        "id",
        "product_id",
        "count",
        "cart_id"
    )
VALUES (
        '5d5e5a8a-1234-5678-90ab-cdef01234567',
        '1b371610-8a82-402d-bfa8-8c7078a1943f',
        1,
        '3d5e5a8a-1234-5678-90ab-cdef01234567'
    ), (
        '7d5e5a8a-1234-5678-90ab-cdef01234567',
        '374f84a6-e189-4758-a546-9eabcb431bec',
        2,
        '4d5e5a8a-1234-5678-90ab-cdef01234567'
    );

-- Insert two orders, one for each cart

INSERT INTO
    "order" (
        "id",
        "user_id",
        "cart_id",
        "payment",
        "delivery",
        "comments",
        "status",
        "total"
    )
VALUES (
        '9d5e5a8a-1234-5678-90ab-cdef01234567',
        '1d5e5a8a-1234-5678-90ab-cdef01234567',
        '3d5e5a8a-1234-5678-90ab-cdef01234567',
        '{"method": "credit_card", "transaction_id": "txn_1234567890"}',
        '{"address": "123 Main St", "city": "New York", "state": "NY", "zip": "10001"}',
        'Great service!',
        'completed',
        100
    ), (
        '0d5e5a8a-1234-5678-90ab-cdef01234567',
        '2d5e5a8a-1234-5678-90ab-cdef01234567',
        '4d5e5a8a-1234-5678-90ab-cdef01234567',
        '{"method": "paypal", "transaction_id": "txn_0987654321"}',
        '{"address": "456 Main St", "city": "Los Angeles", "state": "CA", "zip": "90001"}',
        'Fast delivery!',
        'completed',
        200
    );