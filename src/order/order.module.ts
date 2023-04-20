import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { OrderController } from "./order.controller";

@Module({
  providers: [ OrderService ],
  exports: [ OrderService ],
  controllers: [ OrderController ]
})
export class OrderModule {}
