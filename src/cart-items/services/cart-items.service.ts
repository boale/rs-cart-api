import { Injectable } from '@nestjs/common';

import { CartItem } from '../models';
import { poolQuery } from '../../db';

@Injectable()
export class CartItemsService {
  async getCartItemsByCartId(cartId: string): Promise<CartItem[]> {
	const text = `
    SELECT * FROM cart_items WHERE cart_id=$1
  `;
  	console.log('id', cartId)
    const values = [cartId];
    const cartItemsByUserID = await poolQuery(text, values);
	console.log('cartItemsByUserID', cartItemsByUserID.rows);
	if (!cartItemsByUserID.rows[0]?.id) {
		return null;
	  }
    return cartItemsByUserID.rows[0]
  }

  async addItemToCart(cartId: string, item: CartItem) {
    const text = `
    INSERT INTO cart_items (cart_id, product_id, count) VALUES ($1, $2, $3) RETURNING *
  `;
  console.log('id', cartId)
    const values = [cartId, item.product.id, item.count];
    const newCartItem = await poolQuery(text, values);
	console.log('newCartItem', newCartItem);
	
	if(!!newCartItem){
		return null;
	}

    return newCartItem.rows[0];
  }

  async removeCartIemById(cartId) {
    const cartItems = await poolQuery(
		`DELETE FROM cart-items WHERE id=$1 RETURNING *`,
		[cartId],
	  );
  
	  return cartItems.rows;
  }
}
