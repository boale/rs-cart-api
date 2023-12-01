import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DBModule } from '../db/db.module';


@Module({
  imports: [ OrderModule,DBModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
