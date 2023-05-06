import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [OrderService],
  exports: [OrderService],
  imports: [DatabaseModule],
})
export class OrderModule {}
