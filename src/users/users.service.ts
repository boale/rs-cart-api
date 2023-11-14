import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private database: DatabaseService) {}

  async findAll() {
    return await this.database.user.findMany();
  }

  async findOne(id: string) {
    return this.database.user.findFirst({ where: { id } });
  }

  async remove(id: string) {
    return await this.database.user.delete({ where: { id } });
  }
}
