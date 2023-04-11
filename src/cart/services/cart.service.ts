import { Injectable } from '@nestjs/common';
import { QueryResult } from 'pg';
import { poolQuery } from '../../db/index';
import {Status} from '../models/index';
import { v4 } from 'uuid';

import { Cart, CartItem } from '../models';

@Injectable()
export class CartService {

async findByUserId(userId: string): Promise<Cart> {
    try {
      const selectCartsById = 'SELECT * FROM carts WHERE user_id=$1';
      const values = [userId];
      const cartOfUser: QueryResult = await poolQuery(selectCartsById, values);
      if(!cartOfUser || cartOfUser.rowCount < 1) {
        return null;
      }
      const selectCartItems = 'SELECT * FROM cart_items WHERE cart_id=$1';
      const cartItems: QueryResult = await poolQuery(selectCartItems, [cartOfUser?.rows?.[0].id]);
      const response = {
        id: cartOfUser?.rows[0]?.id,
        // integration with product table needed for below field
        items: (cartItems?.rows?.length > 0) ? cartItems.rows.map(cartItem => ({
          product: cartItem ,
          count: cartItem.count,
        })) : [] , 
        status: cartOfUser?.rows[0]?.status
      };
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }

  }

   async createByUserId(userId: string): Promise<Cart> {
    try {
      const insertCart = `
      INSERT INTO carts (user_id, id, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const values = [userId, v4(v4()), new Date(), new Date(), Status.OPEN];
      const newCart: QueryResult = await poolQuery(insertCart, values);
      console.log('newCart', newCart);

      const response = {
        id: newCart?.rows[0]?.id,
        items: [],
        status: newCart?.rows[0].status
      }

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

   async updateByUserId(userId: string, items : CartItem[]): Promise<Cart> {
    try {
      const { id, status } = await this.findOrCreateByUserId(userId);

      for(const item of items) {
        const values = [id, item.product.id, item.count];
        const updateCart = `INSERT INTO cart_items (cart_id, product_id, count) VALUES ($1, $2, $3) RETURNING *`;
        await poolQuery(updateCart, values);
      }

      const updatedCart: QueryResult = await poolQuery('SELECT * FROM cart_items WHERE cart_id=$1', [id]);

      // if cart does not have products
      if(updatedCart.rowCount < 0) {
        return null;
      }

      const response = { 
        id: id,
        // integration with product table needed for below field
        items: (updatedCart?.rows?.length > 0) ? updatedCart.rows.map(cartItem => ({
        product: cartItem,
        count: cartItem.count
        })) : [],
        status: status
      };

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async removeByUserId(userId): Promise<void> {

 try {
      await poolQuery('BEGIN', []);
      const { id } = await this.findOrCreateByUserId(userId);

      await poolQuery('DELETE FROM cart_items WHERE cart_id=$1', [id]);
      await poolQuery('DELETE FROM carts WHERE user_id=$1', [userId]);
      await poolQuery('COMMIT', []);

    } catch (error) {

      await poolQuery('ROLLBACK', []);
      return error;
    }
  }

}
