import { Injectable } from '@nestjs/common';

import { Cart, CartItem, CartStatus } from '../models';
import { DBService } from '../../db/db.service';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};
  constructor(private db: DBService) {}

  async findByUserId(userId: string, status?: CartStatus): Promise<Cart> {
    let query: string;
    let params: Array<unknown>;
    if (status) {
      query = `SELECT * FROM carts WHERE user_id = '${userId}' AND status = '${status}'`;
    } else {
      query = `SELECT * FROM carts WHERE user_id = '${userId}'`;
      params = [userId];
    }
    const res = await this.db.runQuery<Cart>(query);
    return res[0];
  }

  async createByUserId(userId: string): Promise<Cart> {
    const query = `INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ('${userId}', '${new Date()}', '${new Date()}', '${
      CartStatus.OPEN
    }') RETURNING id`;

    const res = await this.db.runQuery<Cart>(query);
    return res[0];
  }

  async findOrCreateByUserId(
    userId: string,
    status?: CartStatus,
  ): Promise<Cart> {
    const { id } = await this.findByUserId(userId, status);
    if (id) {
      const query = `SELECT * FROM cart_items WHERE cart_id = '${id}'`;
      const items = await this.db.runQuery<CartItem>(query);
      return { id, items };
    }
    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const cart = await this.findOrCreateByUserId(userId, CartStatus.OPEN);
    items.forEach(async item => {
      const query = `UPDATE cart_items SET count = ${item.count} WHERE cart_id = '${cart.id}' AND product_id = '${item.product.id}'`;
      await this.db.runQuery<CartItem>(query);
    });

    return await this.db.runQuery<CartItem>(
      `SELECT * FROM carts WHERE id = '${cart.id}'`,
    )[0];
  }

  removeByUserId(userId: string): void {
    this.db.runQuery<Cart>(`DELETE FROM carts WHERE user_id = '${userId}'`);
  }
}
