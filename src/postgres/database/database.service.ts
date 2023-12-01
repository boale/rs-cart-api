import { Injectable } from '@nestjs/common';
import { Pool, PoolConfig, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor() {
    console.log(process.env);

    const poolConfig: PoolConfig = {
      user: process.env.DB_USERNAME,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: parseInt(process.env.PORT, 10),
      ssl: {
        rejectUnauthorized: false,
      },
    };

    this.pool = new Pool(poolConfig);
  }

  async query(text: string, values?: any[]): Promise<any> {
    const client = await this.pool.connect();

    try {
      return await client.query(text, values);
    } finally {
      client.release();
    }
  }
}
