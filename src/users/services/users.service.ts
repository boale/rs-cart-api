import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models';
import Client from 'pg';

const connectDb = {
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor() {
    this.users = {}
  }

  async findOne(userId: string): Promise<User> {
    const client = new Client(connectDb);
    await client.connect();

    try {
      const query = `select * from users where id='${userId}';`;
      const { rows } = await client.query(query);
      return rows;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
  }

  async createOne({ name, email, password }: User): Promise<User> {
    const client = new Client(connectDb);
    await client.connect();

    try {
      const query = `insert into users (name, email, password)
        values ('${name}', '${email}', '${password}');`;

      const created = await client.query(query);
      return created;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
  }

}
