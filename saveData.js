const { Client } = require('pg');
const { v4 } = require('uuid');

const args = process.argv.slice(2);

const client = new Client({
  host: args[0],
  user: args[1],
  password: args[2],
  port: args[3],
  database: args[4],
  ssl: {
    rejectUnauthorized: false,
  },
});

const setupListeners = () => {
  client.on('error', e => {
    console.log(e);
  });
};

const ids = [v4(), v4(), v4()];

const fillCartsTable = async () => {
  try {
    await client.query('delete from carts');

    await client.query({
      text:
        'INSERT INTO carts(id, user_id, created_at, updated_at, status) VALUES($1, $2, $3, $4, $5)',
      values: [ids[0], v4(), new Date(), new Date(), 'OPEN'],
    });

    await client.query({
      text:
        'INSERT INTO carts(id, user_id, created_at, updated_at, status) VALUES($1, $2, $3, $4, $5)',
      values: [ids[1], v4(), new Date(), new Date(), 'ORDERED'],
    });

    await client.query({
      text:
        'INSERT INTO carts(id, user_id, created_at, updated_at, status) VALUES($1, $2, $3, $4, $5)',
      values: [ids[2], v4(), new Date(), new Date(), 'OPEN'],
    });
  } catch (e) {
    console.log(e);
  }
};

const fillCartItemTable = async () => {
  try {
    await client.query('delete from cart_items');
    await client.query({
      text:
        'INSERT INTO cart_items(product_id, cart_id, count) VALUES($1, $2, $3)',
      values: [v4(), ids[0], 10],
    });
  } catch (e) {
    console.log(e);
  }
};

const fillData = async () => {
  client.query('BEGIN');
  await fillCartsTable();
  await fillCartItemTable();
  client.query('COMMIT');
};

const init = async () => {
  try {
    await client.connect();

    console.log('Connection established!');
    setupListeners();
    await fillData();
    console.log(`Data inserted successfully!`);
  } catch (e) {
    console.log(e);
  }
};

init();
