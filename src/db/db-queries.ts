export const GET_CART_LIST_QUERY = `select * from carts where user_id = $1`;
export const GET_CART_ITEMS_LIST_QUERY = `select * from cart_items where cart_id = $1`;

export const GET_CART_ITEM_BY_PRODUCT_ID_QUERY = `select * from cart_items where product_id = $1`;

export const UPDATE_COUNT_CART_BY_ID_QUERY = `UPDATE cart_items SET count = $1 WHERE product_id = $2 RETURNING count`;
export const CREATE_PRODUCT_IN_CART_QUERY = `INSERT INTO cart_items(cart_id, product_id, count)
    VALUES($1,$2,$3)
    RETURNING *`;

export const DELETE_CART_ITEM_QUERY = `DELETE FROM cart_items WHERE product_id = $1 RETURNING *`;

export const CREATE_STOCK_QUERY = `INSERT INTO stock_service(product_id, count)
    VALUES($1,$2)
    RETURNING count`;

export const GET_USER_QUERY = `SELECT u.user_id, u.name, u.password, u.email
    FROM users AS u`;

// --- With the logo -----
