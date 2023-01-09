import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { OrderController } from './order.controller';
import { DatabaseModule } from '../db/db.module';
import { CartModule } from '../cart/cart.module';

@Module({
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController],
  imports: [DatabaseModule, CartModule],
})
export class OrderModule {}
