import { Injectable } from '@nestjs/common';

import {createConnectionClient} from "../../db/db_client";
import {
  CREATE_ORDER_QUERY,
  DELETE_ORDER_QUERY,
  GET_ORDER_BY_ID_QUERY,
  GET_ORDERS_LIST_QUERY, UPDATE_ORDER_STATUS_QUERY
} from "../../db/db-queries";

let dbClient;

@Injectable()
export class OrderService {
  async getOrder(orderId: string) {
    try {
      dbClient = await createConnectionClient();
      return await dbClient.query(GET_ORDER_BY_ID_QUERY, [orderId]);

    } catch (err) {
      console.log('Error on service getOrder: ', err);
      return {
        Error: err,
      };
    }
  }

  async getOrders(userId: string) {
    try {
      dbClient = await createConnectionClient();

      const orders = await dbClient.query(GET_ORDERS_LIST_QUERY, [userId]);

      if (orders?.rows?.length < 1) {
        throw new Error('orders did not found')
      }

      return orders.rows
    } catch (err) {
      console.log('Error on service getOrders: ', err);
      return {
        Error: err,
      };
    }
  }

  async createOrder(data: any) {
    try {
      const { user_id, cart_id, payment, delivery, comments, status, total, items } = data;

      dbClient = await createConnectionClient();
      return await dbClient.query(CREATE_ORDER_QUERY, [cart_id, user_id, payment, delivery, comments, status, total, items]);

    } catch (err) {
      console.log('Error on service createOrder: ', err);
      return {
        Error: err,
      };
    }
  }

  async updateOrderStatus(orderId, data) {
    try {
      const order = this.getOrder(data.id);

      if (!order) {
        throw new Error('Order does not exist.');
      }

      dbClient = await createConnectionClient();
      const updated = await dbClient.query(UPDATE_ORDER_STATUS_QUERY, [data.status, orderId]);
      return { updated }
    } catch (err) {
        console.log('Error on service updateOrderStatus: ', err)
      return {
        Error: err,
      };    }
  }

  async removeOrder(orderId: string) {
    try {
      dbClient = await createConnectionClient();
      const res = await dbClient.query(DELETE_ORDER_QUERY, [orderId]);

      console.log(res)
    } catch (err) {
      console.log('Error on service removeOrder: ', err);
      return {
        Error: err,
      };
    }
  }
}
