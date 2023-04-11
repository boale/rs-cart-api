import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.PG_HOST,
            port: +process.env.PG_PORT,
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            entities: [ Cart, CartItem, Order, Product, User ],
            namingStrategy: new SnakeNamingStrategy(),
            logging: false,
        }),
        TypeOrmModule.forFeature([ Cart, CartItem, Order, Product, User ]),
    ],
    exports: [ TypeOrmModule ],
})
export class DatabaseModule {}
