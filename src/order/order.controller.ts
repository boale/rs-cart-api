import { Controller, Get, Put, Body, Req, HttpStatus, Post } from "@nestjs/common";

import { OrderService } from '../order';
import { AppRequest } from "../shared";

@Controller('api/profile/order')
export class OrderController {
  constructor(
    private orderService: OrderService
  ) { }

  @Get()
  async findOrder(@Req() req: AppRequest) {
    const order = await this.orderService.findById(req?.query?.id as string);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    }
  }

  @Post()
  async createOrder(@Req() req: AppRequest, @Body() body) {
    const order = await this.orderService.create(body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        order
      }
    }
  }

  @Put()
  async updateOrder(@Req() req: AppRequest, @Body() body) {
    const order = await this.orderService.update(body.orderId, body)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        order
      }
    }
  }
}
