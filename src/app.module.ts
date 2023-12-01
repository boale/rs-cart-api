import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { DBModule } from './db/db.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    DBModule
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
