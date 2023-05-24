import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import { ProductService } from './services';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ DatabaseModule ],
  providers: [ ProductService ],
  controllers: [ ProductController ]
})
export class ProductModule {}
