import { Client } from 'pg';

export const createConnectionClient = async() => {
    const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

    const dbOptions = {
        host: PG_HOST,
        port: PG_PORT,
        database: PG_DATABASE,
        user: PG_USERNAME,
        password: PG_PASSWORD,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 20000,
    };

    const dbClient = new Client(dbOptions);

    dbClient
        .connect()
        .then(() => console.log('connected'))
        .catch((err) => console.log('connection error', err.stack))

    return dbClient;
}