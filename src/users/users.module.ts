import { Module } from '@nestjs/common';

import { UsersService } from './services';
import { DatabaseModule } from '../db/db.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [DatabaseModule],
})
export class UsersModule {}
