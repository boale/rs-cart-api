import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ DatabaseModule ],
  providers: [ OrderService ],
  exports: [ OrderService ]
})
export class OrderModule {}
