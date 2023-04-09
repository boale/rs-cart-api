import { Injectable } from '@nestjs/common';
import { Order } from '../models';
import { runQuery } from 'src/utils';
import { CREATE_ORDER_QUERY } from '../query';

@Injectable()
export class OrderService {
  private orders: Record<string, Order> = {}

  findById(orderId: string): Order {
    return this.orders[ orderId ];
  }

  create(order: Order) {
    const {
      userId,
      cartId,
      delivery,
      payment,
      status,
      comments,
    } = order;

    const createdOrder = runQuery(
      CREATE_ORDER_QUERY, [
        userId,
        cartId,
        delivery,
        payment,
        comments,
        status,
      ]
    );

    return {
      success: true,
      order: createdOrder,
    };
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
}
