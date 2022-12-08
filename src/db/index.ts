import { Pool, Client } from 'pg';

const config = {
  user:  process.env.POSTGRE_DB_USERNAME,
  host: process.env.POSTGRE_HOST,
  database: process.env.POSTGRE_DB_NAME,
  password: process.env.POSTGRE_DB_PASSWORD,
  port: process.env.POSTGRE_DB_PORT,
};

console.log(config)
const pool = new Pool(config);
const client = new Client(config);
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

export const poolQuery = (text, params) => {
  return pool.query(text, params);
};

export const clientQuery = (text, params, callback) => {
  return client.query(text, params, callback);
};
