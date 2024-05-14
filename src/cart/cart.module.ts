import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { PrismaService } from '../db/prisma.service';

@Module({
  imports: [OrderModule],
  providers: [CartService, PrismaService],
  controllers: [CartController],
})
export class CartModule {}
