import { DBClient } from './dbclient';
import { async } from 'rxjs';

const SQL_COMMANDS = {
  SELECT_CART: `SELECT * FROM carts WHERE user_id = $1`,
  SELECT_CART_ITEMS: `SELECT * FROM cart_items WHERE cart_id = $1`,
  INSERT_CART: `INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES ($1, $2, NOW(), NOW(), $3)`,
  INSERT_CART_ITEM: `INSERT INTO cart_items (cart_id, product_id, count)VALUES ($1, $2, $3)ON CONFLICT (cart_id, product_id) DO UPDATE SET count = $3`,
  DELETE_CART_ITEM: `DELETE FROM cart_items WHERE cart_id = $1`,
  DELETE_CART: `DELETE FROM carts WHERE id = $1`,
  UPDATE_CART: `UPDATE carts SET status = $1 WHERE id = $2`,
  INSERT_ORDER:
    'INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
};

export const queryCartByUserId = async (userId: string) =>
  DBClient.query(SQL_COMMANDS.SELECT_CART, [userId]).then(
    ({ rows }) => rows?.[0] || {},
  );

export const queryCartItems = async (cartId: string) =>
  DBClient.query(SQL_COMMANDS.SELECT_CART_ITEMS, [cartId]).then(
    ({ rows }) => rows,
  );

export const insertCart = async ({ cartId, userId, status }) =>
  DBClient.query(SQL_COMMANDS.INSERT_CART, [cartId, userId, status]);

export const insertCartItem = async ({ cartId, productId, count }) =>
  DBClient.query(SQL_COMMANDS.INSERT_CART_ITEM, [cartId, productId, count]);

export const deleteCart = async (cartId: string) =>
  DBClient.query(SQL_COMMANDS.DELETE_CART, [cartId]);

export const deleteCartItem = async (cartId: string) =>
  DBClient.query(SQL_COMMANDS.DELETE_CART_ITEM, [cartId]);

export const updateCart = async ({ cartId, newStatus }) =>
  DBClient.query(SQL_COMMANDS.UPDATE_CART, [newStatus, cartId]);

export const insertOrder = async ({
  id,
  userId,
  cartId,
  payment,
  delivery,
  comments,
  status,
  total,
}) =>
  DBClient.query(SQL_COMMANDS.INSERT_ORDER, [
    id,
    userId,
    cartId,
    payment,
    delivery,
    comments,
    status,
    total,
  ]);
