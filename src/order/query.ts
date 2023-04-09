export const CREATE_ORDER_QUERY = `
INSERT INTO orders (user_id, cart_id, delivery, payment, "comments", status) VALUES ($1,$2, $3,$4, $5);
`;