import { Pool } from 'pg';

const connectionTimeoutMillis = 10000;

const queryOptions = {
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionTimeoutMillis,
};

let pool: Pool;

export const lookup = async (query: string) => {
  if (!pool) {
    pool = new Pool(queryOptions);
  }

  const client = await pool.connect();

  try {
    return await client.query(query);
  } catch (error) {
    console.log(`Error caught: ${error}`);
  } finally {
    client.release();
  }
};
