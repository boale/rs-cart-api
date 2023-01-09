import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './services';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '../db/db.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
