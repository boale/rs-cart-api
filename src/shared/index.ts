export * from './models';
export * from './models-rules';

import { Client, ClientConfig } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

export const dbOptions:ClientConfig = {
  host: PG_HOST,
  port: +PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export const enum CART_STATUS {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED'
}

export const enum ORDER_STATUS {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  ORDERED = 'ORDERED'
}

export const HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
};

let sharedConnection: Client;

export const createSharedConnection = async () => {
  if(!sharedConnection) sharedConnection = new Client(dbOptions);
  await sharedConnection.connect();
  return sharedConnection;
}

export const closeSharedConnection = async () => {
  await sharedConnection.end();
  sharedConnection = null;
}
