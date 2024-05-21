import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    SequelizeModule.forRoot({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      dialect: 'sqlite',
      autoLoadModels: true,
      synchronize: true,
    })
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
