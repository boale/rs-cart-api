import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

import { v4 } from 'uuid';

import { Cart } from '../models';
import { dbConfig } from './../../database/db.config';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Cart> {
    const client = new Client(dbConfig);
    try {
      await client.connect();
      const query = `select * from carts where user_id='${userId}'`;
      const { rows } = await client.query(query);
      return rows as unknown as Cart;
    } catch (e) {
      console.log('e', e)
    } finally {
      await client.end();
    }
  }

  async createByUserId(userId: string) {
    const client = new Client(dbConfig);
    await client.connect();
    try {
      const id = v4(v4());
      const currentDate = new Date();
      const query = `insert into carts (user_id, created_at, updated_at, status)
        VALUES ($1, $2, $3, $4, $5)`;
      return await client.query(query, [
        id,
        userId,
        currentDate,
        currentDate,
        'OPEN',
      ]);
    } catch (e) {
      console.log('e', e)
    } finally {
      await client.end();
    }
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId) as unknown as Cart;
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const client = new Client(dbConfig);
    await client.connect();
    try {
      const { id, ...rest } = await this.findOrCreateByUserId(userId);
      const query = `select * from cart_items where cart_id='${id}';`;
      const { rows } = await client.query(query);
      return rows as unknown as Cart;
    } catch (e) {
      console.log('e', e)
    } finally {
      await client.end();
    }
  }

  async removeByUserId(userId): Promise<void> {
    try {
      const client = new Client(dbConfig);
      await client.connect();
      const query = `delete from carts where user_id='${userId}';`;
      await client.query(query);
      return 
    } catch (e) {
      console.log('e', e)
    }
  }

}
