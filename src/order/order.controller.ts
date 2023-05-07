import { Controller, Get, HttpStatus } from '@nestjs/common';
import { OrderService } from './services';

@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrders() {
    // @Req() req: AppRequest
    const orders = await this.orderService.getOrders();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { orders },
    };
  }
}
