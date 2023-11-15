import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart_item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.RDS_DB_HOST,
      port: +process.env.RDS_DB_PORT,
      username: process.env.RDS_DB_USERNAME,
      password: process.env.RDS_DB_PASSWORD,
      database: process.env.RDS_DB_NAME,
      entities: ['dist/database/entities/*.entity{.ts,.js}'],
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Cart, CartItem]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
