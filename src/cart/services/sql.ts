import { Cart, cartItemTableName, cartTableName } from '../models';

export const cartQuery = `
      SELECT "id" 
      FROM ${cartTableName} 
      WHERE "user_id" = $1
      ;`;

export const cartItemsQuery = `
      SELECT "product_id", "count" 
      FROM ${cartItemTableName} 
      WHERE "cart_id" = $1
      ;`;

export const insertCartQuery = `
      INSERT INTO ${cartTableName}("id", "user_id", "created_at", "updated_at")
      VALUES ($1, $2, $3, $4);
      `;

export const getDeleteCartItemByProductIdsQuery = (
  productIdsForDelete: string[],
) => `
      DELETE FROM ${cartItemTableName}
      WHERE 
      "cart_id" = $1
      AND
      "product_id" IN (${productIdsForDelete.join(', ')})
      ;`;

export const insertCartItemQuery = (cart: Cart) => {
  let query = `
      INSERT INTO ${cartItemTableName} ("cart_id", "product_id", "count")
      VALUES \n`;

  for (let i = 0; i < cart.items.length; i++) {
    query += `($1, '${cart.items[i].product.id}', '${cart.items[i].count}')`;
    if (i !== cart.items.length - 1) {
      query += ',';
    }
  }

  return query;
};

export const deleteCartItemQuery = `
      DELETE FROM ${cartItemTableName}
      WHERE "cart_id" = $1;
      `;
