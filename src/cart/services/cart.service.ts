import { Injectable } from '@nestjs/common';
import {createConnectionClient} from "../../db/db_client";
import {
  CREATE_PRODUCT_IN_CART_QUERY, DELETE_CART_ITEM_QUERY,
  GET_CART_ITEM_BY_PRODUCT_ID_QUERY,
  GET_CART_ITEMS_LIST_QUERY,
  GET_CART_LIST_QUERY,
  UPDATE_COUNT_CART_BY_ID_QUERY
} from "../../db/db-queries";

let dbClient;

@Injectable()
export class CartService {
  async updateCartItem(req, item) {
    try {
      const productId = item.product.product_id;
      const userId = req.params.userId;
      dbClient = await createConnectionClient();

      const result = await dbClient.query(GET_CART_ITEM_BY_PRODUCT_ID_QUERY,[productId]);
      const cart = await dbClient.query(GET_CART_LIST_QUERY, [userId]);

      if (result.rows[0]) {
        let count = +result.rows[0].count;
        const digit = count < item.count ? ++count : --count;

        const updated = await dbClient.query(UPDATE_COUNT_CART_BY_ID_QUERY, [digit, productId]);
        const adjustedItem = updated.rows[0];
        return { adjustedItem, cart };
      }

      const adjustedItem = await dbClient.query(CREATE_PRODUCT_IN_CART_QUERY, [cart.rows[0].id, productId, item.count]);
      return { adjustedItem, cart } ;

    } catch (err) {
      console.log('Error on service updateCartItem: ', err);
      return {
        Error: err,
      }
    }
  }

  async removeCartItem(productId) {
    try {
      dbClient = await createConnectionClient();
      await dbClient.query(DELETE_CART_ITEM_QUERY, [productId]);

    } catch (err) {
      console.log('Error on service removeCartItem: ', err);
      return {
        Error: err,
      };
    }
  }

  async getCarts(userId: string) {
    try {
      dbClient = await createConnectionClient();
      const cart = await dbClient.query(GET_CART_LIST_QUERY, [userId]);

      if (!cart) {
        throw new Error(`Cart not found`)
      }

      const items = await dbClient.query(GET_CART_ITEMS_LIST_QUERY, [cart.rows[0].id]);

      return { cart, items };
    } catch (err) {
      console.log('Error on service getCarts: ', err);
      return {
        Error: err,
      };
    }
  }
}
