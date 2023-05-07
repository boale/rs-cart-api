import { Pool } from 'pg';
import { QueryResult } from 'pg';

const {
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_HOST,
} = process.env;

const options = {
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  database: DATABASE_NAME,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
};

let pool;
if (!pool) {
  pool = new Pool(options);
}

export const client = async (action: string) => {
  const client = await pool.connect();

  let result: QueryResult;

  try {
    result = await client.query(action);
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    client.release();
  }
  return result;
};
