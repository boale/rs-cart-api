import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services';
import { User } from '../entities/user.entity';
import { Cart } from '../entities/cart.entity';
import { Order } from '../entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Order])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
