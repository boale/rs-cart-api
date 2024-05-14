import { Injectable } from '@nestjs/common';

import { Cart } from '../models';
import { PrismaService } from '../../db/prisma.service';
import { v4 } from '../../shared/index';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  constructor(private readonly db: PrismaService) {}

  async findByUserId(userId: string) {
    const cart = await this.db.cart.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        cart_items: true,
      },
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    return {
      id: cart.id,
      items: cart.cart_items.map((item) => {
        return {
          product: {
            id: item.product_id,
            price: 10,
          },
          count: item.count,
        };
      }),
    };
  }

  createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[userId] = userCart;

    return userCart;
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart) {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

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
