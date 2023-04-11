import { Module } from '@nestjs/common';

import { UsersService } from './services';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ DatabaseModule ],
  providers: [ UsersService ],
  exports: [ UsersService ],
})
export class UsersModule {}
