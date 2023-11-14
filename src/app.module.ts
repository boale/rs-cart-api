import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, CartModule, ProductsModule, UsersModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
