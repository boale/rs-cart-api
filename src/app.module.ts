import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
