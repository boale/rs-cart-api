import { Inject } from '@nestjs/common';
import { Cart, CartItem } from '../../database/entities';
import { Product } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export async function calculateCartTotal(
  cart: Cart,
  products: Product[],
): Promise<number> {
  return cart
    ? cart.cartItems.reduce((acc: number, cartItem: CartItem) => {
        const product = products?.find(
          product => product.id === cartItem.productId,
        );
        return (acc += product?.price ? +product.price : 0 * cartItem.count);
      }, 0)
    : 0;
}
