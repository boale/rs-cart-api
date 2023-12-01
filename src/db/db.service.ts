import { Injectable } from '@nestjs/common';
import { Client, QueryResult } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

@Injectable()
export class DBService {
  public async runQuery<T>(query: string): Promise<T[]> {
    const client = new Client({
      host: PG_HOST,
      port: +PG_PORT,
      database: PG_DATABASE,
      user: PG_USERNAME,
      password: PG_PASSWORD,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    try {
      await client
        .connect()
        .then(() => console.log('request to db with query: ', query));
      const res = await client.query<QueryResult<T>>(query);
      return res.rows as T[];
    } catch (err) {
      console.error(err);
    } finally {
      await client.end();
    }
  }
}
