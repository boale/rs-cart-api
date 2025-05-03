import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CartItem } from './entities/cartItem.entity';
import { Cart } from './entities/cart.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const dbConfig = {
          type: 'postgres' as const,
          host: configService.get('DB_HOST') || 'localhost',
          port: parseInt(configService.get('DB_PORT') || '5432', 10),
          username: configService.get('DB_USERNAME') || 'postgres',
          password: configService.get('DB_PASSWORD') || 'postgres',
          database: configService.get('DB_DATABASE') || 'rsshop',
          entities: [CartItem, Cart, Order, User],
          synchronize: false,
          logging: true,
          autoLoadEntities: true,
          ssl: { rejectUnauthorized: false },
          extra: {
            max: 1,
            connectionTimeoutMillis: 10000,
            query_timeout: 4000,
            statement_timeout: 4000,
            keepalive: true,
            keepaliveInitialDelayMillis: 5000,
          },
        };
        Logger.log('DB Config Applied:', dbConfig);
        return dbConfig;
      },
      inject: [ConfigService],
    }),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
