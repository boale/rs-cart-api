import { Controller, Get, Req, HttpStatus } from '@nestjs/common';
import { AppRequest } from '../shared';

import { lookup } from '../db/client';

@Controller('api/order')
export class OrderController {
  constructor() { }

  @Get()
  async findUserOrder(@Req() req: AppRequest) {
    const orders = [];

    try {
      const result = await lookup(`
                SELECT o.id, o.user_id, o.cart_id, o.payment, o.delivery, o.comments, o.status, o.total, ci.product_id, ci.count, u.first_name, u.last_name
                   FROM orders o
                   JOIN cart_items ci ON o.cart_id = ci.cart_id
                   JOIN users u ON o.user_id = u.id
            `);

      result.rows.map(item => ({
        ...item,
        address: {
          ...item.delivery,
          comment: item.comments,
          firstName: item.first_name,
          lastName: item.last_name
        },
        statusHistory: [{
          status: item.status
        }]
      })).forEach((resultItem) => {
        const index = orders.findIndex((order) => order.id === resultItem.id);
        if (index > -1) {
          orders[index].items.push({
            productId: resultItem.product_id,
            count: resultItem.count
          });
        } else {
          orders.push({
            ...resultItem,
            items: [{
              productId: resultItem.product_id,
              count: resultItem.count
            }]
          });
        }
      });
    } catch (error) {
      console.error('Error executing query', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        body: JSON.stringify({error: 'Internal Server Error'}),
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: orders,
    }
  }
}