"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolQuery = void 0;
const pg_1 = require("pg");
const { DB_USER_NAME, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;
const options = {
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    user: DB_USER_NAME,
    password: DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 50000,
};
let pool;
if (!pool) {
    pool = new pg_1.Pool(options);
}
exports.poolQuery = async (action, values) => {
    const client = await pool.connect();
    let result;
    try {
        result = await client.query(action, values);
    }
    catch (err) {
        console.log(err);
        return err;
    }
    finally {
        client.release();
    }
    return result;
};
//# sourceMappingURL=index.js.map