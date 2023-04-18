import { Carts } from 'src/database/entities/carts.entity';
import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(carts: Carts): number {
  return carts
    ? carts.cartItems.reduce((acc: number, cartItems) => {
        return (acc += 1 * cartItems.count);
      }, 0)
    : 0;
}
