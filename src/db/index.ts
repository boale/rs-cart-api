import { Pool, QueryResult } from 'pg';

const {DB_USER_NAME, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST} = process.env;

const options = {
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER_NAME,
  password: DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 50000,
};

let pool;
if (!pool) {
  pool = new Pool(options);
}

export const poolQuery = async (action: string, values) => {
  const client = await pool.connect();

  let result: QueryResult;

  try {
    result = await client.query(action, values);
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    client.release();
  }
  return result;
};