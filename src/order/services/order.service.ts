import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

import { Order } from '../models';
import { dbConfig } from './../../database/db.config';

@Injectable()
export class OrderService {
  async findById(orderId: string): Promise<Order> {
    const client = new Client(dbConfig);
    try {
      await client.connect();
      const query = `select * from orders where id='${orderId}'`;
      const {rows} = await client.query(query);
      return rows as unknown as Order;
    } catch (e) {
      console.log('e', e)
    } finally {
      await client.end();
    }
  }

  async update(orderId, data) {
    const client = new Client(dbConfig);
    const { cartId: cart_id, payment, delivery, comments, total, status } = data;
    try {
      await client.connect();
      const query = `update orders
        set 
          cart_id='${cart_id}'
          payment='${payment}'
          delivery='${delivery}'
          comments='${comments}'
          status='${status}'
          total='${total}'
        where id='${orderId}';`;
      return await client.query(query);
    } catch (e) {
      console.log('e', e)
    } finally {
      await client.end();
    }
  }

  async create(data) {
    const client = new Client(dbConfig);
    const { userId: user_id, cartId: cart_id, payment, delivery, comments, total, status } = data;
    try {
      await client.connect();
      const query = `insert into orders (user_id, cart_id, payment, delivery, comments, status, total)
        values ('${user_id}', '${cart_id}', '${payment}', '${delivery}', '${comments}', '${status}', '${total}');`;
      return await client.query(query);
    } catch (e) {
      console.log('e', e)
    } finally {
      await client.end();
    }
  }
}
