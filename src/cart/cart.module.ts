import { Module } from '@nestjs/common';
import { getDBClient } from '../utils/db-client';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

@Module({
  imports: [OrderModule],
  providers: [
    CartService,
    {
      provide: 'PG',
      useValue: getDBClient(),
    },
  ],
  controllers: [CartController],
  exports: ['PG'],
})
export class CartModule {}
