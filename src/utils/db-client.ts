import { Client } from 'pg';

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
const dbOptions = {
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  connectionTimeoutMillis: 5000,
};

export function getDBClient() {
  const client = new Client(dbOptions);
  client.connect();

  return client;
}
