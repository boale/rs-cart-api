/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require('pg');
require('dotenv').config();

const { cartsData } = require('./dataToFill');

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

const client = new Client(dbOptions);

client.connect();

(async () => {
  try {
    await client.query('BEGIN');

    for (const cart of cartsData) {
      
      const {
        user_id,
        created_at,
        updated_at,
        status,
      } = cart;

      await client.query('INSERT INTO carts (user_id, created_at, updated_at, status) VALUES ($1, $2, $3, $4)', [
        user_id,
        created_at,
        updated_at,
        status,
      ]);
    }

    await client.query('COMMIT');
    console.log('Data inserted successfully!');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Failed to insert data:', e);
  } finally {
    client.end();
  }
})();