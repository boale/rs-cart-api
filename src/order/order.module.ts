import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { OrdersController } from './order.controller';

import { DatabaseModule } from '../database/database.module';
import { CartService } from '../cart/services/cart.service';

@Module({
  providers: [OrderService],
  controllers: [OrdersController],
  exports: [OrderService],
  imports: [DatabaseModule],
})
export class OrderModule {}
