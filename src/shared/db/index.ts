const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

export const dbOptions = {
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
  connectionTimeoutMillis: 5000,
};
