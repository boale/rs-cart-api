import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models';
import { createConnectionClient } from "../../db/db_client";
import { GET_USER_QUERY } from "../../db/db-queries";

let dbClient;

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor() {
    this.users = {}
  }

  findOne(userId: string): User {
    return this.users[ userId ];
  }

  createOne({ name, password }: User): User {
    const id = v4(v4());
    const newUser = { id: name || id, name, password };

    this.users[ id ] = newUser;

    return newUser;
  }

  async getUsers() {
    try {
      dbClient = await createConnectionClient();
      const result = await dbClient.query(GET_USER_QUERY);

      return result;
    } catch (err) {
      console.log('error on getting users: ', err);
      return {
        Error: err,
      };
    }
  }
}
