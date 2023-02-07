import { Pool, QueryResult } from 'pg';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const {
  DB_PASS,
  DB_NAME,
  DB_USER_NAME,
  DB_PORT,
  DB_HOST,
  OUT_DB,
} = process.env;

const options = {
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER_NAME,
  password: DB_PASS,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};
let pool;
console.log('what is OUT_DB: ', OUT_DB, DB_HOST, DB_NAME);

if (!pool && OUT_DB !== 'yes') {
  pool = new Pool(options);
}

export const client = async (action: string) => {
  let result: QueryResult = {
    rows: [],
    command: '',
    rowCount: 0,
    fields: [],
    oid: 0,
  };

  if (OUT_DB === 'yes') {
    return result;
  } else {
    const client = await pool.connect();

    try {
      result = await client.query(action);
    } catch (err) {
      console.log(err);
      return err;
    } finally {
      client.release();
    }
    return result;
  }
};
