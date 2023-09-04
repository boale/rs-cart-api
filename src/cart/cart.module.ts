import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';
import { UsersModule } from '../users/users.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

@Module({
  imports: [ OrderModule, UsersModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
