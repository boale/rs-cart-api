INSERT INTO "carts" ("id", "user_id", "created_at", "updated_at") VALUES ('00000000-1111-1111-1111-000000000001', '00000000-0000-0000-0000-000000000001', '2023-01-08', '2023-01-08');

INSERT INTO "cart_items" ("cart_id", "product_id", "count") VALUES ('00000000-1111-1111-1111-000000000001', '32632c6e-c113-32ba-48b0-8e32110754f7', 1);
INSERT INTO "cart_items" ("cart_id", "product_id", "count") VALUES ('00000000-1111-1111-1111-000000000001', '05f55788-a187-dcf2-f306-d79f545da2c3', 1);
INSERT INTO "cart_items" ("cart_id", "product_id", "count") VALUES ('00000000-1111-1111-1111-000000000001', 'a4cee412-124a-657a-c49c-29c9805d1177', 1);
INSERT INTO "cart_items" ("cart_id", "product_id", "count") VALUES ('00000000-1111-1111-1111-000000000001', '9da1d2e1-53a2-3672-0ada-8552628cb16c', 2);

INSERT INTO "orders" ("id", "user_id", "cart_id", "payment", "delivery", "comment", "status", "total") VALUES ('c4e39ff4-04d5-4d26-a8da-8ce0a974c0b9', '00000000-0000-0000-0000-000000000001', '00000000-1111-1111-1111-000000000001', '{}', '{"address":"Shipp","firstName":"Firstname 1","lastName":"Lastname1"}', 'New comment', 'COMPLETED', 0);
INSERT INTO "orders" ("id", "user_id", "cart_id", "payment", "delivery", "comment", "status", "total") VALUES ('10000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', '00000000-1111-1111-1111-000000000001', '{}', '{"firstName": "Ostap",
"lastName": "Bender",
"address": "Deribasovskaya st. 221b"
}', 'I need delivery just now', 'OPEN', 1000);

INSERT INTO "users" ("id", "username", "password", "email") VALUES ('00000000-0000-0000-0000-000000000001', 'obender', 'testonly', 'email@test.only');
