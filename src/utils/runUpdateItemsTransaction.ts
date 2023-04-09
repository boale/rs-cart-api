import { CREATE_CART_ITEM_QUERY } from "src/cart/services/queries";

/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require('pg');
require('dotenv').config();

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

export const runUpdateItemsTransaction = async (cart_id, items) => {
  const client = new Client(dbOptions);
  client.connect();

  try {
    await client.query('BEGIN');

    for (const item of items) {
      const {
        product_id,
        count
      } = item;
  
      await client.query(CREATE_CART_ITEM_QUERY, [
        cart_id,
        product_id,
        count,
      ]);

      await client.query('COMMIT');
      console.log('Data inserted successfully!');
    }
  } catch(error) {
    await client.query('ROLLBACK');
    console.error('Failed to insert data:', error);
  } finally {
    client.end();
  }
};