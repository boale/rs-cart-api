import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models';
import { DatabaseService } from '../../db/db.service';

@Injectable()
export class UsersService {
  constructor(private readonly dataBase: DatabaseService) {}

  async findOne(userId: string) {
    const user = await this.dataBase.db.query(
      'select * from users where id=:userId',
      { userId },
    );
    return user;
  }

  async createOne({ name, password, email }: User): Promise<User> {
    const id = v4(v4());
    const newUser = { id, name, password, email: email ?? 'no@email' };

    await this.dataBase.db.query(
      'insert into users (id, username, password, email) values (:id, :name, :password, :email)',
      newUser,
    );
    return newUser;
  }
}
