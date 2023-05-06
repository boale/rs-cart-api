import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { Cart, CartItem, Order, Product, User } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.DB_HOST}`,
      port: +`${process.env.DB_PORT}`,
      database: `${process.env.DB_NAME}`,
      username: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      entities: [Cart, CartItem, Order, Product, User],
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Cart, CartItem, Order, Product, User]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
