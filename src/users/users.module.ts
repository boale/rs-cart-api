import { Module } from '@nestjs/common';

import { UsersController } from './user.controller';

import { UsersService } from './services';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
