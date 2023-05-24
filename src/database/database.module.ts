import { Module } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Stock } from './entities/stock.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/database/entities/*.entity{.ts,.js}'],
      /**
       * Flag to show all generated sql queries on each interaction with DB.
       * Should be omitted for production production.
       */
      logging: true,
      /**
       * This naming strategy will map field_name from database to fieldName inside application.
       */
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Cart, CartItem, User, Order, Stock, Product]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}