import { Pool } from 'pg';

const { DB_PASSWORD, DB_USERNAME, DB_NAME, DB_PORT, DB_HOST } = process.env;

const options = {
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
};

let pool;

export const lookup = async <T>(query: string): Promise<{ rows: T[] }> => {
  if (!pool) {
    pool = new Pool(options);
  }
  const client = await pool.connect();

  try {
    return client.query(query);
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};
