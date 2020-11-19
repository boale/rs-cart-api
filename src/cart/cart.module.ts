import { Module } from '@nestjs/common';

import { CartController } from './cart.controller';
import { CartService } from './services';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [ UsersModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
