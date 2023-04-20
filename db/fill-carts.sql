INSERT INTO carts (id, user_id, created_at, updated_at, status)
values (
    '40e6215d-b5c6-4896-987c-f30f3678f608',
	'40e62153-b5c6-4896-987c-f30f3678f608',
	'2022-04-01',
	'2023-04-01',
	'OPEN'
),
(
    '40e6215d-b5c6-4896-987c-f30f3678f607',
	'fefd3976-b4ed-4351-b4d7-ac974d278992',
	'2022-04-01',
	'2023-04-01',
	'OPEN'
)
(
    '6ecd8c99-4036-403d-bf84-cf8400f67836',
	'5ecd8c99-4036-403d-bf84-cf8400f67836',
	'2022-04-01',
	'2023-04-01',
	'ORDERED'
),
(
    '3f333df6-90a4-4fda-8dd3-9485d27cee36',
	'7f333df6-90a4-4fda-8dd3-9485d27cee36',
	'2022-04-01',
	'2023-04-01',
	'OPEN'
);

INSERT INTO cart_items (cart_id, product_id, count)
values (
    '40e6215d-b5c6-4896-987c-f30f3678f608',
	'40e62153-b5c6-4896-987c-f30f3678f608',
	1
),
(
    '6ecd8c99-4036-403d-bf84-cf8400f67836',
	'5ecd8c99-4036-403d-bf84-cf8400f67836',
	2
),
(
    '3f333df6-90a4-4fda-8dd3-9485d27cee36',
	'7f333df6-90a4-4fda-8dd3-9485d27cee36',
	3
);

insert into users (name, email, password) values
('Anastasia', 'anastasia_plyako@epam.com', 'vrr');
