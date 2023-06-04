import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Cart } from '../database/entities/cart.entity';
import { CartItem } from '../database/entities/cartItem.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
    TypeOrmModule.forFeature([Cart, CartItem]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
