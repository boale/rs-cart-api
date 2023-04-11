import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DatabaseModule } from '../database/database.module';


@Module({
  imports: [ OrderModule, DatabaseModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
