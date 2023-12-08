import { Pool } from "pg";

const { DATABASE_PASSWORD, DATABASE_USERNAME, DATABASE_NAME, DATABASE_PORT, DATABASE_HOST } = process.env;

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

export const lookup = async (query: string, params?: [string]) => {
  console.log(options);
  if (!pool) {
    pool = new Pool(options);
  }
  const client = await pool.connect();

  try {
    console.log(query);
    const result = await client.query(query, params);
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};