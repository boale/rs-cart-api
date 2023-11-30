CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    carts (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id uuid DEFAULT uuid_generate_v4(),
        created_at timestamp DEFAULT current_timestamp,
        updated_at timestamp DEFAULT current_timestamp,
        status varchar(10) CHECK (status IN ('OPEN', 'ORDERED'))
    );

CREATE TABLE
    cart_items (
        cart_id uuid REFERENCES carts(id),
        product_id uuid,
        count integer,
        PRIMARY KEY (cart_id, product_id)
    );

-- Insert test data into the carts table

INSERT INTO
    carts (
        user_id,
        created_at,
        updated_at,
        status
    )
VALUES (
        uuid_generate_v4(),
        '2023-11-30 11:00:00',
        '2023-11-30 11:30:00',
        'OPEN'
    ), (
        uuid_generate_v4(),
        '2023-11-30 11:00:00',
        '2023-11-30 11:25:00',
        'ORDERED'
    );

-- Insert test data into the cart_items table

INSERT INTO
    cart_items (cart_id, product_id, count)
VALUES ( (
            SELECT id
            FROM carts
            WHERE
                status = 'OPEN'
            LIMIT
                1
        ), uuid_generate_v4(), 10
    ), ( (
            SELECT id
            FROM carts
            WHERE
                status = 'ORDERED'
            LIMIT
                1
        ), uuid_generate_v4(), 4
    );