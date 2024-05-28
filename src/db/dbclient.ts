import { Client, QueryResult } from 'pg';
import * as process from 'node:process';

export const DBClient = {
  isConnected: false,

  _client: new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  }),

  async connect() {
    if (!this.isConnected) {
      await this._client.connect();
      this.isConnected = true;
    }
  },

  async query(query: string, values: any[]): Promise<QueryResult> {
    if (!this.isConnected) {
      throw 'Database is not connected yet. Please, establish connection before querying data';
    }
    return this._client.query(query, values);
  },

  async end() {
    if (this.isConnected) {
      await this._client.end();
      this.isConnected = false;
    }
  },
};
