import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { DatabaseService } from '../../db/db.service';
import { CartService } from '../../cart';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataBase: DatabaseService,
    private readonly cartService: CartService,
  ) {}
  private orders: Record<string, Order> = {};

  async getOrdersByUser(userId: string) {
    const orders = await this.dataBase.db.query<{
      id: string;
      user_id: string;
      cart_id: string;
      payment: string;
      delivery: Record<string, string>;
      status: string;
      comment: string;
      total: number;
      items: any[];
    }>('select * from orders where user_id=:userId', { userId });
    for (const order of orders) {
      const items = await this.cartService.getByCartId(order.cart_id);
      order.items = items.map(({ count, product_id }) => ({
        count,
        productId: product_id,
      }));
    }
    return orders.map(
      ({ user_id, id, status, cart_id, total, comment, delivery, items }) => {
        return {
          userId: user_id,
          id,
          status,
          cartId: cart_id,
          total: total,
          address: {
            address: delivery?.address ?? '',
            firstName: delivery?.firstName ?? '',
            lastName: delivery?.lastName ?? '',
            comment,
          },
          statusHistory: [
            {
              status,
              timestamp: Date.now(),
              comment,
            },
          ],
          items,
        };
      },
    );
  }

  async findById(orderId: string) {
    return this.orders[orderId];
  }

  async create(userId: string, data: any) {
    const {
      address: addr = {},
      comment = '',
      status = 'SENT',
      total = 0,
    } = data;
    const address = addr?.address ?? '';
    const firstName = addr?.firstName ?? '';
    const lastName = addr?.lastName ?? '';

    const delivery = JSON.stringify({ address, firstName, lastName });

    const cartId = (await this.cartService.findByUserId(userId)).id;
    const params = {
      id: v4(),
      userId,
      cartId,
      comment,
      status,
      total,
    };
    const query = `INSERT INTO orders (id, user_id, cart_id, delivery, payment, comment, status, total) VALUES (:id, :userId, :cartId, '${delivery}', '{}', :comment, :status, :total)`;

    try {
      await this.dataBase.db.executeQuery('BEGIN');
      await this.dataBase.db.query(query, params);
      await this.dataBase.db.executeQuery('COMMIT');
      return params;
    } catch (e) {
      await this.dataBase.db.executeQuery('ROLLBACK');
      return e;
    }
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[orderId] = {
      ...data,
      id: orderId,
    };
  }

  async updateStatus(orderId: string, status: string, comment: string) {
    try {
      await this.dataBase.db.executeQuery('BEGIN');
      await this.dataBase.db.query(
        'update orders set status=:status, comment=:comment where id=:orderId',
        { status: status?.toLocaleUpperCase(), comment, orderId },
      );
      await this.dataBase.db.executeQuery('COMMIT');
    } catch (e) {
      console.log(
        'Error update status',
        JSON.stringify({ e, message: e?.message }),
      );
      await this.dataBase.db.executeQuery('ROLLBACK');
    }
    return {};
  }

  async deleteOrder(orderId: string, userId: string) {
    await this.dataBase.db.query(
      'delete from orders where id=:orderId and user_id=:userId',
      { orderId, userId },
    );
    return {};
  }
}
