import { Injectable } from '@nestjs/common';

import { Cart, CartItem } from '../models';

import { Client } from 'pg';
import { dbOptions } from '../../shared';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string, conn?: Client): Promise<Cart> {
    let client = conn;
    if (!conn) {
      client = new Client(dbOptions);
      await client.connect();
    }

    try {
      const cartId = (await client.query(
        'select id from carts where user_id = $1;',
        [userId],
      )).rows[0]?.id;
      console.log('cartId3');
      console.log(cartId);
      if (!cartId) return null;
      const resItems = await client.query(
        'select product_id, count from cart_items where cart_id = $1;',
        [cartId],
      );

      return {
        id: cartId,
        items: resItems.rows
      }
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      if(!conn) {
        await client.end();
      }
    }
  }

  async createByUserId(userId: string):Promise<Cart> {
    const client = new Client(dbOptions);
    await client.connect();

    try {
      const cart = await client.query(
        'insert into carts (user_id) values ($1) returning *; ',
        [userId],
      );
      console.log('cart created');
      console.log(cart);

      return {
        id: cart.rows[0].id,
        items: []
      }
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await client.end();
    }
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId({ userId, items } : { userId: string, items: CartItem[] }): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const client = new Client(dbOptions);
    await client.connect();

    try {
      const insertValuesQuery = items.reduce((acc, curr, index) => {
        return `${acc}${index ? ',' : ''}('${curr.product_id}',${curr.count},'${id}')`
      }, '');

      console.log('query to insert');
      console.log(insertValuesQuery);

      await client.query(
        `insert into cart_items (product_id, count, cart_id) values ${insertValuesQuery};`
      );

      const updatedCart = await this.findOrCreateByUserId(userId);

      return updatedCart
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await client.end();
    }
  }

  async updateCartStatus(cartId: string, conn?: Client):Promise<void> {
    let client = conn;
    if (!client) {
      client = new Client(dbOptions);
      await client.connect();
    }

    try {
      await client.query(
        `update carts set status = 'ORDERED' where id = $1;`,
        [cartId],
      );
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      if(!conn) {
        await client.end();
      }
    }
  }

  async removeByUserId(userId): Promise<void> {
    const client = new Client(dbOptions);
    await client.connect();

    try {
      const res = await client.query(
        'delete from carts where user_id = ($1);',
        [userId],
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      await client.end();
    }
  }

}
