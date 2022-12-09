import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';
import { Client } from 'pg';
import { v4 } from 'uuid';
import { keyBy } from 'lodash';

import { Cart } from '../models';
import { dbOptions } from 'src/shared/db';
import {
  cartItemsQuery,
  cartQuery,
  deleteCartItemQuery,
  getDeleteCartItemByProductIdsQuery,
  insertCartItemQuery,
  insertCartQuery,
} from './sql';

@Injectable()
export class CartService {
  private dbClient;
  private lambda;

  constructor() {
    console.log('dbOptions', dbOptions);
    this.dbClient = new Client(dbOptions);
    this.lambda = new AWS.Lambda();
  }

  async getCart(cartId: string): Promise<Cart> {
    const client = new Client(dbOptions);
    try {
      await client.connect();

      const {
        rows: [cart],
      } = await client.query(`select * from carts where id = '${cartId}'`);
      const { rows: items } = await client.query(
        `select * from cart_items where cart_id = '${cartId}'`
      );

      return {
        ...cart,
        items,
      };
    } catch (err) {
      console.log(err);
    } finally {
      await client.end();
    }
  }

  // async findByUserId(userId: string): Promise<Cart> {
  //   try {
  //     console.log('findByUserId db 1');
  //     await this.dbClient.connect();
  //     console.log('findByUserId db 2');
  //     const values = [userId];
  //     console.log('findByUserId db 3', values);
  //     const cartId: string = (await this.dbClient.query(cartQuery, values))
  //       ?.rows?.[0]?.id;

  //     console.log('findByUserId db 4', cartId);
  //     if (!cartId) return undefined;
  //     console.log('findByUserId db 5');
  //     const valuesItems = [cartId];

  //     const items: { product_id: string; count: number }[] = (
  //       await this.dbClient.query(cartItemsQuery, valuesItems)
  //     )?.rows;

  //     console.log('findByUserId');
  //     const { Payload } = await this.lambda
  //       .invoke({
  //         FunctionName: '',
  //       })
  //       .promise();

  //     const { body } = JSON.parse(Payload as string);
  //     const productList: {
  //       id: string;
  //       title: string;
  //       description: string;
  //       price: number;
  //       count: number;
  //     }[] = JSON.parse(body);

  //     const productsById = keyBy(productList, 'id');

  //     return {
  //       id: cartId,
  //       items: items.length
  //         ? items.map((item) => ({
  //             product: productsById[item.product_id],
  //             count: item.count,
  //           }))
  //         : [],
  //     };
  //   } catch (e) {
  //     throw { message: e, code: 502 };
  //   } finally {
  //     this.dbClient.end();
  //   }
  // }

  async createByUserId(userId: string) {
    console.log('createByUserId');
    const dbClient = new Client(dbOptions);
    try {
      console.log('createByUserId 22');
      await dbClient.connect();
      console.log('createByUserId  333');
      const id = v4();
      const date = new Date().toISOString();
      const values = [id, userId, date, date];
      console.log('createByUserId  44', values);
      await dbClient.query(insertCartQuery, values);

      console.log('createByUserId  5');
      return await this.getCart(userId);
    } catch (e) {
      throw { message: e, code: 502 };
    } finally {
      dbClient.end();
    }
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    console.log('findOrCreateByUserId');
    const userCart = await this.getCart(userId);

    console.log('userCart');
    if (userCart) {
      return userCart;
    }

    console.log('userCart 2', userCart);
    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const dbClient = new Client(dbOptions);
    try {
      await dbClient.connect();

      const { id: cartId, ...rest } = await this.findOrCreateByUserId(userId);

      const updatedCart = {
        id: cartId,
        ...rest,
        items: [...items],
      };

      const productIdsForDelete = updatedCart.items.map(
        (item) => `'${item.product.id}'`
      );

      const valuesDelete = [cartId];
      await dbClient.query(
        getDeleteCartItemByProductIdsQuery(productIdsForDelete),
        valuesDelete
      );

      const valuesInsert = [cartId];
      await dbClient.query(insertCartItemQuery(updatedCart), valuesInsert);

      return await this.getCart(userId);
    } catch (e) {
      throw { message: e, code: 502 };
    } finally {
      dbClient.end();
    }
  }

  async removeByUserId(userId): Promise<void> {
    const dbClient = new Client(dbOptions);
    try {
      await dbClient.connect();

      const valuesFind = [userId];

      const { id: cartId } = (
        await dbClient.query(cartQuery, valuesFind)
      )?.rows?.[0];
      if (!cartId) return;

      const valuesDeleteCartItem = [cartId];

      await dbClient.query(deleteCartItemQuery, valuesDeleteCartItem);
    } catch (e) {
      throw { message: e, code: 502 };
    } finally {
      dbClient.end();
    }
  }
}
