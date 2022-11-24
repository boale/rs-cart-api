import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {
    vladOstk: {
      id: '00000000-0000-0000-0000-000000000000',
      items: [
        {
          count: 3,
          product: {
            title: 'Cart product',
            description: 'Cart description',
            price: 9.99,
            id: 'test123',
          },
        },
      ],
    },
  };

  findByUserId(userId: string): Cart {
    return this.userCarts['vladOstk'];
  }

  createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[userId] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items }: Cart): Cart {
    const { id, ...rest } = this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    this.userCarts[userId] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
