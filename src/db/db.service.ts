import { Inject, Injectable } from '@nestjs/common';
import { DB } from './DB';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  db: DB;
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {
    this.db = new DB(pool);
  }
}
