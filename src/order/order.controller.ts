import { Controller, HttpStatus, Body, Get, Delete, Param, Post } from '@nestjs/common';

import { OrderService } from './services';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) { }

  @Get()
  async findAll() {
    const orders = await this.orderService.findAll();

    return orders;
  }

  @Post()
  async checkout(@Body() body) {
    const order = await this.orderService.create(body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order }
    }
  }

  @Delete(`/:orderId`)
  async deleteOrder(@Param(`orderId`) orderId: string) {
    const id = await this.orderService.deleteOrder(orderId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Deleted',
      data: { id }
    }
  }
}
