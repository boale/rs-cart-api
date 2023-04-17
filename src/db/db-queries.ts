export const GET_CART_LIST_QUERY = `select * from carts where user_id = $1`;
export const GET_ORDERS_LIST_QUERY = `select * from orders where user_id = $1`;
export const GET_CART_ITEMS_LIST_QUERY = `select * from cart_items where cart_id = $1`;
export const GET_CART_ITEM_BY_PRODUCT_ID_QUERY = `select * from cart_items where product_id = $1`;
export const GET_ORDER_BY_ID_QUERY = `select * from orders where id = $1`;

export const UPDATE_COUNT_CART_BY_ID_QUERY = `UPDATE cart_items SET count = $1 WHERE product_id = $2 RETURNING count`;
export const UPDATE_ORDER_STATUS_QUERY = `UPDATE orders SET status = $1 WHERE id = $2 RETURNING status`;

export const CREATE_PRODUCT_IN_CART_QUERY = `INSERT INTO cart_items(cart_id, product_id, count)
    VALUES($1,$2,$3)
    RETURNING *`;
export const CREATE_ORDER_QUERY = `INSERT INTO orders(cart_id, user_id, payment, delivery, comments, status, total, items)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8)`;

export const DELETE_CART_ITEM_QUERY = `DELETE FROM cart_items WHERE product_id = $1 RETURNING *`;
export const DELETE_ORDER_QUERY = `DELETE FROM orders WHERE id = $1 RETURNING *`;

export const GET_USER_QUERY = `SELECT u.user_id, u.name, u.password, u.email
    FROM users AS u`;


