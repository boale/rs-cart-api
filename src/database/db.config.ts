import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, './../../.env') });

export const dbConfig = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: true
};
