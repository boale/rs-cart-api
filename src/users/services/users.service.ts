import { Injectable } from '@nestjs/common';

import { User } from '../models';
import { Client } from 'pg';
import { dbOptions } from '../../shared';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor() {
    this.users = {}
  }

  async findOne(userId: string, conn?:Client): Promise<User> {
    let client = conn;
    if (!conn) {
      client = new Client(dbOptions);
      await client.connect();
    }

    try {
      if (!userId) return null;
      const user = await client.query(
        'select * from users where id = $1;',
        [userId],
      );

      if (!user.rows.length) {
        return null;
      }

      return user.rows[0]
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      if(!conn) {
        await client.end();
      }
    }
  }

  async createOne({ name, password }: User): Promise<User> {
    const client = new Client(dbOptions);
    await client.connect();

    const user = await client.query(
      'insert into users (name, password) values ($1,$2) returning *;',
      [name, password],
    );

    return user.rows[0];
  }

}
