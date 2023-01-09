import { Pool } from 'pg';
import { Module } from '@nestjs/common';
import { DatabaseService } from './db.service';

export const databasePoolFactory = () => {
  const { DB_HOST, DB_USER, DB_PORT, DB_PASS, DB_NAME } = process.env;
  return new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASS,
    port: isNaN(Number(DB_PORT)) ? 5432 : Number(DB_PORT),
  });
}

@Module({
  providers: [
    {
      useFactory: databasePoolFactory,
      provide: 'DATABASE_POOL',
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
