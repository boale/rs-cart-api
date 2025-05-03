INSERT INTO users (id, email, password) VALUES
(
    'ca53d4d6-b3a9-4211-9afd-b7154d762a1f',
    'test1@test.com',
    'password1'
),
(
    'ca54d4d6-b3a9-4211-9afd-b7154d762a1a',
    'test2@test.com',
    'password2'
),
(
    'ca55d4d6-b3a9-4211-9afd-b7154d762a1b',
    'test3@test.com',
    'password3'
);

INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
(
    'dc37f1e4-e882-450d-8307-e59f040034b4',
    'ca53d4d6-b3a9-4211-9afd-b7154d762a1f',
    CURRENT_DATE,
    CURRENT_DATE,
    'OPEN'
),
(
    'dc37f1e4-e882-450d-8307-e59f040034b5',
    'ca54d4d6-b3a9-4211-9afd-b7154d762a1a',
    CURRENT_DATE - 3,
    CURRENT_DATE - 4,
    'ORDERED'
),
(
    'dc37f1e4-e882-450d-8307-e59f040034b6',
    'ca55d4d6-b3a9-4211-9afd-b7154d762a1b',
    CURRENT_DATE - 1,
    CURRENT_DATE - 2,
    'ORDERED'
);

INSERT INTO cart_items (cart_id, product_id, count) VALUES
(   'dc37f1e4-e882-450d-8307-e59f040034b4',
    'bc891654-f3ae-4a32-85be-02c5e62d7743',
    1
),
(   'dc37f1e4-e882-450d-8307-e59f040034b5',
    'bc891654-f3ae-4a32-85be-02c5e62d7743',
    2
),
(   'dc37f1e4-e882-450d-8307-e59f040034b6',
    'bc891654-f3ae-4a32-85be-02c5e62d7743',
    3
);

INSERT INTO orders (
    id,
    user_id,
    cart_id,
    payment,
    delivery,
    comments,
    status,
    total
) VALUES
(
    'abfeffcb-afd0-4009-ae46-f76bd5c82fd1',
    'ca53d4d6-b3a9-4211-9afd-b7154d762a1f',
    'dc37f1e4-e882-450d-8307-e59f040034b4',
    '{"method": "paypal", "email": "test@test.com", "amount": 5.00}'::jsonb,
    '{"address": "1 Long Street", "city": "Dublin", "zip": "02"}'::jsonb,
    'Please deliver in the morning',
    'PAID',
     5.00
),
(
    '1bfeffcb-afd0-4009-ae46-f76bd5c82fd4',
    'ca54d4d6-b3a9-4211-9afd-b7154d762a1a',
    'dc37f1e4-e882-450d-8307-e59f040034b5',    
    '{"method": "paypal", "email": "test12@test.com", "amount": 2.00}'::jsonb,
    '{"address": "2 Short Street", "city": "Cork", "zip": "12"}'::jsonb,
    NULL,
    'PAID',
     2.00
);
