import { Module } from '@nestjs/common';
import { CartService } from '../cart/services/cart.service';
import { CartModule } from '../cart/cart.module';
import { DatabaseModule } from '../database/database.module';
import { OrderController } from './order.controller';
import { OrderService } from './services';

@Module({
  imports: [ DatabaseModule, CartModule ],
  providers: [ OrderService ],
  controllers: [ OrderController ],
})
export class OrderModule {}
