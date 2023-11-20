import { Injectable } from '@nestjs/common'
import { Client } from 'pg';

import { v4 } from 'uuid';

import { User } from '../models';
import { dbConfig } from './../../database/db.config';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor() {
    this.users = {}
  }

  async findOne(userId: string): Promise<User> {
    const client = new Client(dbConfig);
    await client.connect();

    try {
      const query = `select * from users where id='${userId}';`;
      const { rows } = await client.query(query);
      return rows as unknown as User;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
  }

  async createOne({ name, email, password }: User): Promise<User> {
    const client = new Client(dbConfig);
    await client.connect();

    try {
      const query = `insert into users (name, email, password)
        values ('${name}', '${email}', '${password}');`;

      const created = await client.query(query);
      return created as unknown as User;
    } catch (error) {
      console.error('Error DB request: ', error)
    }
  }

}
