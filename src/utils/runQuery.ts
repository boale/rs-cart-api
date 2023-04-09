import { Pool } from 'pg';

const {
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
  DB_USER_NAME,
} = process.env;

const dbOptions = {
  user: DB_USER_NAME,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
};

const pool = new Pool(dbOptions);

export const runQuery = async (query, values) => {
  const client = await pool.connect();

  try {
    const response = await client.query(query, values);
    const { rows: [ result ] } = response;
    return result;
  } catch(error) {
    return { error: error.message }
  } finally {
    client.release();
  }
};