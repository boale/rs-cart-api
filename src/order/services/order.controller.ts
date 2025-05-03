import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderPayload, OrderStatus } from '../type';
import { BasicAuthGuard } from '../../auth/guards/bacis-auth.guard';

@Controller('api/orders')
@UseGuards(BasicAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() orderData: CreateOrderPayload) {
    return await this.orderService.create(orderData);
  }

  @Get()
  async getAllOrders() {
    const orders = await this.orderService.findAll();
    return orders.map((order) => ({
      id: order.id,
      user_id: order.user_id,
      cart_id: order.cart_id,
      email: order.user.email, // Email from user relation
      payment: order.payment,
      delivery: order.delivery,
      comments: order.comments,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.orderService.findOneById(id);
  }

  //   @Get(':id/history')
  //   async getOrderHistory(@Param('id') id: string) {
  //     return await this.orderService.getStatusHistory(id);
  //   }

  //   @Delete(':id')
  //   @HttpCode(HttpStatus.NO_CONTENT)
  //   async deleteOrder(@Param('id') id: string) {
  //     await this.orderService.deleteOrder(id);
  //   }

  //   @Put(':id/status')
  //   async updateStatus(
  //     @Param('id') id: string,
  //     @Body() body: { status: OrderStatus; comment?: string },
  //   ) {
  //     return await this.orderService.updateStatus(
  //       id,
  //       body.status,
  //       body.comment || '',
  //     );
  //   }
}
