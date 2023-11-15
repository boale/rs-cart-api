CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;

CREATE TABLE IF NOT EXISTS carts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID DEFAULT uuid_generate_v4(),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status VARCHAR(8) CHECK (status IN ('OPEN', 'ORDERED')) NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
    cart_id UUID REFERENCES carts(id),
    product_id UUID NOT NULL,
    count INTEGER,
    PRIMARY KEY (cart_id, product_id)
);

INSERT INTO carts (created_at, updated_at, status)
VALUES
    ('2023-01-01', '2023-01-01', 'OPEN'),
    ('2023-01-02', '2023-01-02', 'ORDERED');

INSERT INTO cart_items (cart_id, product_id, count)
VALUES
    ((SELECT id FROM carts WHERE created_at = '2023-01-01'), 'e2e63e93-3021-428a-8ea8-b300cd093151', 3),
    ((SELECT id FROM carts WHERE created_at = '2023-01-01'), '318c910e-36bb-4fc7-b38a-c84ba84eb01f', 2),
    ((SELECT id FROM carts WHERE created_at = '2023-01-02'), '5d62a34c-34fb-412a-a046-a7d4112d8d84', 1);
