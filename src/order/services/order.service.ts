import { Injectable } from '@nestjs/common';

import { Order } from '../models';
import {createConnectionClient} from "../../db/db_client";
import {
  CREATE_ORDER_QUERY,
  GET_ORDER_BY_ID_QUERY,
  GET_ORDERS_LIST_QUERY
} from "../../db/db-queries";

let dbClient;

@Injectable()
export class OrderService {
  private orders: Record<string, Order> = {}

  async findById(orderId: string) {
    try {
      dbClient = await createConnectionClient();
      return await dbClient.query(GET_ORDER_BY_ID_QUERY, [orderId]);

    } catch (err) {
      console.log('error on getting orders: ', err);
      return {
        Error: err,
      };
    }
  }

  async create(data: any) {
    try {
      const { user_id, cart_id, payment, delivery, comments, status, total, items } = data;

      dbClient = await createConnectionClient();
      return await dbClient.query(CREATE_ORDER_QUERY, [cart_id, user_id, payment, delivery, comments, status, total, items]);

    } catch (err) {
      console.log('error on getting orders: ', err);
      return {
        Error: err,
      };
    }
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[ orderId ] = {
      ...data,
      id: orderId,
    }
  }

  async getOrders(userId, ) {
    try {
      dbClient = await createConnectionClient();

      const orders = await dbClient.query(GET_ORDERS_LIST_QUERY, [userId]);

      if (orders?.rows?.length < 1) {
        throw new Error('orders did not found')
      }

      return orders.rows
    } catch (err) {
      console.log('error on getting orders: ', err);
      return {
        Error: err,
      };
    }
  }
}
