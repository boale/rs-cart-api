import { Injectable } from '@nestjs/common';
import { Cart, CartItem } from '../models';
import { lookup } from '../../db/db-client';

@Injectable()
export class CartService {
  async findCartById(cartId: string) {
    const response = await lookup<Cart>(
      `SELECT * FROM carts where id = '${cartId}'`,
    );

    console.log('response:', response);
    if (!response) {
      return {
        cart: null,
      };
    }

    const [cart] = response.rows;
    const items = await lookup<CartItem>(
      `select * from cart_items where cart_id = '${cart.id}'`,
    );

    return {
      cart: {
        ...cart,
        items: items?.rows || [],
      },
    };
  }

  async removeByUserId(userId): Promise<void> {
    await lookup(`DELETE FROM carts WHERE userId = ${userId};`);
  }
}
