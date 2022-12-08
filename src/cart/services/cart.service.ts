import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartItem } from '../models';
import { poolQuery } from '../../db';

@Injectable()
export class CartService {
  async findByUserId(userId: string): Promise<Cart> {
	const text = `
    SELECT * FROM carts WHERE user_id=$1
  `;
  	console.log('id', userId)
    const values = [userId];
    const cartByUserID = await poolQuery(text, values);
	console.log('cartByUserID', cartByUserID.rows);
	if (!cartByUserID.rows?.[0]?.id) {
		return null;
	  }
	const cartItems = await poolQuery(
		`SELECT * FROM cart_items 
		JOIN products ON products.id = cart_items.product_id WHERE cart_id=$1`,
		[cartByUserID.rows?.[0].id],
	  );
	  console.log('cartItems', cartItems)
	  const cart = {
		id: cartByUserID.rows[0].id,
		items: cartItems.rows.map(cartItem => ({
		  product: { ...cartItem },
		  count: cartItem.count,
		})),
	  };
    return cart;
  }

  async createByUserId(userId: string) {
    const text = `
    INSERT INTO carts (user_id, id, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *
  `;
  console.log('id', userId)
    const values = [userId, v4(v4()), new Date(), new Date()];
    const newCart = await poolQuery(text, values);
    console.log('newCart', newCart);

    return {
      id: newCart.rows[0].id,
      items: [],
    };
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);
	console.log('userCart', userCart)
    if (userCart) {
      return userCart;
    }
    const newCart = await this.createByUserId(userId);
    console.log('CreatedNewCart', newCart);

    return newCart;
  }

  async updateByUserId(userId: string, { product, count }: CartItem): Promise<Cart> {
	const { id, ...rest }: any = await this.findOrCreateByUserId(userId);

    const cartItems = await poolQuery(
      `SELECT * FROM cart_items WHERE product_id=$1 AND cart_id=$2`,
      [product.id, id],
    );


    if (count > cartItems.rows?.[0]?.count || !cartItems.rows?.[0]) {
      if (cartItems.rows[0]) {
        console.log("UPDATE")
        await poolQuery(
          `UPDATE cart_items SET count=$3 WHERE product_id=$1 AND cart_id=$2`,
          [product.id, id, count],
        );
      }
	}
	const updatedCartItems = await poolQuery(
		`SELECT * FROM cart_items 
		JOIN products ON products.id = cart_items.product_id WHERE cart_id=$1`,
		[id],
	  );

	  const updatedCart = {
		id,
		...rest,
		items: updatedCartItems.rows.map(cartItem => ({
		  product: { ...cartItem },
		  count: cartItem.count,
		})),
	  };
	return updatedCart;
  }

  async removeByUserId(userId): Promise<void> {
    await poolQuery(`DELETE FROM carts WHERE user_id=$1 LIMIT 1`, [userId]);
  }
}
