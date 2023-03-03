import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'pg';

import { v4 } from 'uuid';

import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(@Inject('PG') private clientPg: Client) {}

  private userCarts: Record<string, Cart> = {};

  private cartId = 'e35aa9ee-8b9d-4cfb-8427-d83f90a4d84d';

  async findByUserId(userId: string): Promise<Cart> {
    try {
      const result = await this.clientPg.query(
        `select product_id, count from cart_items where cart_id = '${this.cartId}';`,
      );

      return {
        id: this.cartId,
        items: result.rows,
      };
    } catch (err) {
      console.log('findByUserId err -->', err);
      await this.clientPg.end();
    }
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

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const values = items
      .map(item => {
        return `('${this.cartId}', ${item.count})`;
      })
      .join(', ');

    console.log(values);

    await this.clientPg.query(
      `insert into cart_items (cart_id, count) values ${values}`,
    );
    return this.findOrCreateByUserId(userId);
  }

  async removeByUserId(): Promise<void> {
    try {
      await this.clientPg.query(
        `delete from cart_items where cart_id = '${this.cartId}'`,
      );
    } catch (err) {
      console.log(`There was an error trying to remove cart items ${err}`);
      await this.clientPg.end();
    }
  }
}
