export const CART_WITH_ITEMS_QUERY = `
  SELECT carts.*, array_agg(
    json_build_object(
      'product_id', cart_items.product_id,
      'count', cart_items.count,
      'cart_id', cart_items.cart_id
    )
  ) as items
  FROM carts
  LEFT JOIN cart_items ON carts.id = cart_items.cart_id
  WHERE carts.user_id = $1
  GROUP BY carts.id
`;

export const CREATE_CART_QUERY = `
  INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ($1, $2, $3, $4)
`;

export const DELETE_CART_BY_USER_ID_QUERY = `DELETE FROM carts WHERE user_id = $1`;

export const CREATE_CART_ITEM_QUERY = `INSERT INTO cart_items (cart_id, product_id, count) VALUES ($1, $2, $3)`;

export const UPDATE_CART_QUERY = `
  UPDATE carts SET status = $1, updated_at = $2 where user_id = $3;
`