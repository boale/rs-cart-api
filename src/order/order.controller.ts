import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { OrderService } from './services';
import { AppRequest } from '../shared';

@Controller('api/profile/order')
export class OrdersController {
  constructor(private orderService: OrderService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const orders = await this.orderService.getAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { orders },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async submitOrder(@Body() body) {
    // TODO: validate body payload...
    console.log('submitOrder', 'body', body);
    const orders = await this.orderService.update(body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        orders,
      },
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    console.log('getById', ':id', id);
    if (!id) {
      throw new Error('getById: no order id to ');
    }

    return this.orderService.getById(id);
  }

  @Put(':id/status')
  async putStatusById(@Param('id') id: string, @Body() body) {
    console.log('putStatusById', ':id', id);
    console.log('putStatusById', 'body', body);

    if (!id) {
      throw new Error('putStatusById: no order id');
    }

    return this.orderService.putStatusById(id, {
      status: body.status,
      comments: body.comments,
    });
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.orderService.deleteById(id);
  }
}
