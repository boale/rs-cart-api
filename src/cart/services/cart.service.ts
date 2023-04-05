import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';
import {createConnectionClient} from "../../db/db_client";
import {
  CREATE_PRODUCT_IN_CART_QUERY, DELETE_CART_ITEM_QUERY,
  GET_CART_ITEM_BY_PRODUCT_ID_QUERY,
  GET_CART_ITEMS_LIST_QUERY,
  GET_CART_LIST_QUERY, GET_USER_QUERY,
  UPDATE_COUNT_CART_BY_ID_QUERY
} from "../../db/db-queries";

let dbClient;

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  findByUserId(userId: string): Cart {
    return this.userCarts[ userId ];
  }

  createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[ userId ] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(req, item) {
    try {
      const productId = item.product.product_id;
      const userId = req.params.userId;
      dbClient = await createConnectionClient();

      const result = await dbClient.query(GET_CART_ITEM_BY_PRODUCT_ID_QUERY,[productId]);
      const cart = await dbClient.query(GET_CART_LIST_QUERY, [userId]);

      if (result.rows[0]) {
        let count = +result.rows[0].count;
        const digit = +result.rows[0].count < item.count ? ++count : --count;

        const updated = await dbClient.query(UPDATE_COUNT_CART_BY_ID_QUERY, [digit, productId]);
        const adjustedItem = updated.rows[0];
        return { adjustedItem, cart };
      }

      const adjustedItem = await dbClient.query(CREATE_PRODUCT_IN_CART_QUERY, [cart.rows[0].id, productId, item.count]);
      return { adjustedItem, cart } ;

    } catch (err) {
      console.log(err)
      return err
    }
  }

  async removeByUserId(productId) {
    try {
      dbClient = await createConnectionClient();
      console.log("productId: ", productId)
      const res = await dbClient.query(DELETE_CART_ITEM_QUERY, [productId]);

      console.log("RES, ", res)
    } catch (err) {
      console.log('error on removing cart by product id: ', err);
      return {
        Error: err,
      };
    }
  }

  async findListsByUserId(userId: string) {
    try {
      dbClient = await createConnectionClient();
      const cart = await dbClient.query(GET_CART_LIST_QUERY, [userId]);

      if (!cart) {
        console.log('CART LIST did not found');
        throw new Error(`Cart not found`)
      }

      const items = await dbClient.query(GET_CART_ITEMS_LIST_QUERY, [cart.rows[0].id]);

      return { cart, items };
    } catch (err) {
      console.log('error on getting cart by id: ', err);
      return {
        Error: err,
      };
    }
  }
}
