import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

import { PostgresModule } from 'src/postgres/postgres.module';

@Module({
  imports: [OrderModule, PostgresModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
