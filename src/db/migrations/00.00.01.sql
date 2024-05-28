CREATE TYPE cart_status AS ENUM('OPEN', 'ORDERED');

CREATE TABLE carts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status cart_status NOT NULL
);

CREATE TABLE cart_items (
    cart_id UUID NOT NULL,
    product_id UUID,
    count INTEGER,
    FOREIGN KEY(cart_id) REFERENCES carts(id)
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    cart_id UUID NOT NULL REFERENCES carts(id),
    payment JSON NOT NULL,
    delivery JSON NOT NULL,
    comments TEXT,
    status TEXT CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    total NUMERIC(10, 2) NOT NULL
);

INSERT INTO carts(id, user_id, created_at, updated_at, status)
VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', current_date, current_date, 'OPEN'),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', current_date, current_date, 'ORDERED');

INSERT INTO cart_items(cart_id, product_id, count)
VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'bb0ddc99-9c0b-4ef8-bb6d-6bb9bd380add', 3),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'dd0bbc99-9c0b-4ef8-bb6d-6bb9bd380abb', 1);

INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total)
VALUES
    ('c9b1d2d6-9b40-11ec-b909-0242ac120002', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '{"method": "credit_card", "transaction_id": "txn_01"}', '{"address": "123 Main St", "city": "Anytown", "zip": "12345"}', 'Please deliver between 9am-5pm', 'pending', 99.99),
    ('d87bba34-9b40-11ec-b909-0242ac120002', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '{"method": "paypal", "transaction_id": "txn_02"}', '{"address": "456 Elm St", "city": "Othertown", "zip": "67890"}', 'Leave at the front door', 'processing', 49.50),
    ('e87dbb78-9b40-11ec-b909-0242ac120002', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '{"method": "bank_transfer", "transaction_id": "txn_03"}', '{"address": "789 Oak St", "city": "Sometown", "zip": "54321"}', NULL, 'shipped', 150.75);
