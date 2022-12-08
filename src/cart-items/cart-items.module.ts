import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartItemsController } from './cart-items.controller';
import { CartItemsService } from './services';


@Module({
  imports: [ OrderModule ],
  providers: [ CartItemsService ],
  controllers: [ CartItemsController ]
})
export class CartItemsModule {}
