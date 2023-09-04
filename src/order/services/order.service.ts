import { Injectable } from '@nestjs/common';

import { Order } from '../models';
import { Client } from 'pg';
import { dbOptions, ORDER_STATUS } from '../../shared';

@Injectable()
export class OrderService {
  private orders: Record<string, Order> = {}

  async findById(orderId: string): Promise<Order> {
    const client = new Client(dbOptions);
    await client.connect();

    const order = await client.query(
      'select * from orders where id = $1; ',
      [orderId],
    );
    return order.rows[0];
  }

  async create(data: any, conn: Client): Promise<Order> {
    let client = conn;
    if (!conn) {
      client = new Client(dbOptions);
      await client.connect();
    }

    const { userId, cartId, total, delivery, payment, items } = data;
    const deliveryParam = delivery || JSON.stringify({type: 'newDelivery'});
    const paymentParam = payment || JSON.stringify({type: 'newPayment', address: 'someAddress'});
    const status = ORDER_STATUS.IN_PROGRESS;

    try {
      const order = await client.query(
        'insert into orders (user_id, cart_id, total,delivery,payment, status) values ($1,$2,$3,$4,$5,$6) returning *; ',
        [userId, cartId, total, deliveryParam, paymentParam, status],
      );
      console.log('order created');
      console.log(order);

      return { ...order.rows[0], items };
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      if(!conn) {
        await client.end();
      }
    }
  }

  async update(orderId, data) {
    const client = new Client(dbOptions);
    await client.connect();
    const { delivery = '', payment = '', status = '' } = data;

    try {
      await client.query(
        `UPDATE orders SET
        status = COALESCE(NULLIF($1, ''), status::text)::order_status,
        delivery = COALESCE(NULLIF($2, '')::json, delivery),
        payment = COALESCE(NULLIF($3, '')::json, payment)
        WHERE id = $4;`
        , [status, delivery, payment, orderId]);


    } catch (e) {
      console.log(e);
    } finally {
      await client.end();
    }
  }
}
