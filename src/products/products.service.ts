import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private database: DatabaseService) {}

  async findAll() {
    return await this.database.product.findMany();
  }

  async findOne(id: string) {
    const cart = await this.database.product.findFirst({ where: { id } });
    if (cart) {
      return cart;
    }

    return new NotFoundException();
  }
}
