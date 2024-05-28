import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';
import { DBClient } from '../../db/dbclient';
import {
  deleteCart,
  deleteCartItem,
  insertCart,
  insertCartItem,
  insertOrder,
  queryCartByUserId,
  queryCartItems,
  updateCart,
} from '../../db/queries';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Cart> {
    try {
      const { cartId } = await queryCartByUserId(userId);
      const items = await queryCartItems(cartId);
      return {
        id: cartId,
        items: items,
      };
    } catch (error) {
      await DBClient.end();
      throw error;
    }
  }

  async createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      items: [],
    };
    try {
      await insertCart({ cartId: id, userId, status: 'OPEN' });
    } catch (error) {
      await DBClient.end();
      throw error;
    }

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart.id) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    items: { id: string; count: number }[],
  ): Promise<Cart> {
    const { id: cartId, ...rest } = await this.findOrCreateByUserId(userId);

    Promise.all(
      items.map(({ id: productId, count }) =>
        insertCartItem({
          cartId,
          productId,
          count,
        }),
      ),
    ).catch((error) => {
      console.log(error);
      DBClient.end();
      throw error;
    });

    const updatedCart = {
      id: cartId,
      ...rest,
      items: [...items],
    };

    return { ...updatedCart };
  }

  async removeByUserId(userId: string) {
    const { id: cartId } = await this.findByUserId(userId);
    if (cartId) {
      await deleteCartItem(cartId);
      await deleteCart(cartId);
    }
  }

  async checkout(
    cart: Cart,
    userId: string,
    body: {
      payment: { type: string };
      delivery: { address: string; city: string };
      comments: string;
    },
  ): Promise<void> {
    await insertOrder({
      id: v4(),
      userId,
      cartId: cart.id,
      payment: JSON.stringify(body.payment),
      delivery: JSON.stringify(body.delivery),
      comments: body.comments,
      status: 'NEW',
      total: 0,
    });

    await updateCart({ cartId: cart.id, newStatus: 'ORDERED' });
  }
}
