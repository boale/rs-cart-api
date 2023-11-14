import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CartService {
  constructor(private database: DatabaseService) {}

  async getCart(id: string) {
    return await this.database.cart.findFirst({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        userId: true,
        items: true,
      },
    });
  }

  async create(createCartDto: CreateCartDto) {
    try {
      return await this.database.cart.create({
        data: {
          status: createCartDto.status,
          userId: createCartDto.userId,
          items: {
            create: createCartDto.items,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    return await this.database.cart.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        userId: true,
        items: true,
      },
    });
  }

  async findOne(id: string) {
    const cart = await this.getCart(id);
    if (cart) {
      return cart;
    } else {
      return new NotFoundException('Not Found');
    }
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return await this.database.cart.update({
      where: { id },
      data: {
        status: updateCartDto.status,
        updatedAt: new Date(),
        items: {
          updateMany: updateCartDto.items.map((item) => ({
            where: { cartId: id },
            data: item,
          })),
        },
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        userId: true,
        items: true,
      },
    });
  }

  async remove(id: string) {
    return await this.database.cart.delete({ where: { id } });
  }
}
