import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [OrderModule, DatabaseModule, HttpModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
