import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';
import { Client } from 'pg';

import { Cart } from '../models';

@Injectable()
export class CartService {
  private PG_HOST = process.env.PG_HOST;
  private PG_PORT = process.env.PG_PORT;
  private PG_DATABASE = process.env.PG_DATABASE;
  private PG_USERNAME = process.env.PG_USERNAME;
  private PG_PASSWORD = process.env.PG_PASSWORD;
  private dbOptions = {
    host: this.PG_HOST,
    port: this.PG_PORT,
    database: this.PG_DATABASE,
    user: this.PG_USERNAME,
    password: this.PG_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
  };

  private async withClient<T>(
    callback: (client: Client) => Promise<T>,
  ): Promise<T> {
    const client = new Client(this.dbOptions);
    await client.connect();
    try {
      return await callback(client);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      await client.end();
    }
  }

  findByUserId(userId: string): Promise<Cart | null> {
    return this.withClient(async client => {
      const result = await client.query(
        'SELECT * FROM carts WHERE user_id = $1',
        [userId],
      );
      return result.rows[0] || null;
    });
  }

  createByUserId(userId: string): Promise<Cart> {
    return this.withClient(async client => {
      const id = v4();
      const result = await client.query(
        'INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES ($1, $2, NOW(), NOW(), $3) RETURNING *',
        [id, userId, 'OPEN'],
      );
      return result.rows[0];
    });
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const existingCart = await this.findByUserId(userId);

    if (existingCart) {
      return existingCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart | null> {
    const existingCart = await this.findByUserId(userId);

    if (!existingCart) {
      return null;
    }

    return this.withClient(async client => {
      const result = await client.query(
        'UPDATE carts SET items = $1, updated_at = NOW() WHERE user_id = $2 RETURNING *',
        [items, userId],
      );
      return result.rows[0] || null;
    });
  }

  async removeByUserId(userId): Promise<void> {
    return this.withClient(async client => {
      await client.query('DELETE FROM carts WHERE user_id = $1', [userId]);
    });
  }
}
