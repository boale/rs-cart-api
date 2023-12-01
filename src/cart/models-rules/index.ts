import { Cart, CartItem } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  console.log(cart);
  return cart?.items ? cart.items.reduce((acc: number, { count }: CartItem) => {
    return acc += 1 * count;
  }, 0) : 0;
}
