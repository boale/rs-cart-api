import { Body, Controller, Delete, Get, Param, Put, Req } from '@nestjs/common';
import { OrderService } from './services';
import { AppRequest, getUserIdFromRequest } from '../shared';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  async getOrders(@Req() req: AppRequest) {
    const userId = getUserIdFromRequest(req);
    const orders = await this.orderService.getOrdersByUser(userId);
    console.log('Orders list', JSON.stringify(orders));
    return orders;
  }

  @Get('/:id')
  async getOrdersById(@Req() req: AppRequest, @Param('id') id: string) {
    const userId = getUserIdFromRequest(req);
    const orders = await this.orderService.getOrdersByUser(userId);
    const order = orders.find(o => id === o?.id) ?? {};
    console.log('Order by id', JSON.stringify(order));
    return order;
  }

  @Put()
  async createOrder(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    const order = await this.orderService.create(userId, body);
    console.log('Order create', JSON.stringify(order));
    return order;
  }
  @Put(':id/status')
  async putStatus(
    @Req() req: AppRequest,
    @Param('id') id: string,
    @Body() body,
  ) {
    const { comment, status } = body;
    await this.orderService.updateStatus(id, status, comment);
    console.log('Status', JSON.stringify({ status, comment, id }));
    return status;
  }
  @Delete(':id')
  async deleteOrder(@Req() req: AppRequest, @Param('id') id: string) {
    const userId = getUserIdFromRequest(req);
    const result = await this.orderService.deleteOrder(id, userId);
    console.log('Delete Order', JSON.stringify(result));
    return result;
  }
}
