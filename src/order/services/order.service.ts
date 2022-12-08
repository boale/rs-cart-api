import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { poolQuery } from 'src/db';

@Injectable()
export class OrderService {
  private orders: Record<string, Order> = {};

  async findById(orderId: string): Promise<Order> {
    const orders = await poolQuery(`SELECT * FROM orders WHERE id=$1 LIMIT 1`, [
      orderId,
    ]);
    return orders.rows[0];
  }

  async create(data: any) {
    const { user_id, cart_id, payment, delivery, comments, total } = data;

    const orders = await poolQuery(
      `INSERT INTO orders (user_id, cart_id, payment, delivery, comments, total, status)
	  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [user_id, cart_id, payment, delivery, comments, total, 'inProgress'],
    );
    console.log('ORDERS', orders);

    return orders.rows[0];
  }

  async updateByOrderId(orderId, data): Promise<Order> {
    const {
      user_id,
      cart_id,
      payment,
      delivery,
      comments,
      total,
      status,
    } = data;
    const orders = await poolQuery(
      `UPDATE orders SET (
			user_id = $1,
			cart_id = $2,
			payment = $3,
			delivery = $4,
			comments = $5,
			total = $6,
			status = $7)
		WHERE id=$8 LIMIT 1`,
      [user_id, cart_id, payment, delivery, comments, total, status, orderId],
    );
    return orders.rows[0];
  }
}
