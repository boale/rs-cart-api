import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../database/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartRepo.findOneBy({ user_id: userId });
  }

  async createByUserId(userId: string): Promise<boolean> {
    try {
      await this.cartRepo.insert({ id: v4(v4()), user_id: userId, items: [] });
    } catch (error) {
      return false;
    }
    return true;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    await this.createByUserId(userId);

    return this.findByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<boolean> {
    try {
      const { id, ...rest } = await this.findOrCreateByUserId(userId);

      const updatedCart = {
        id,
        ...rest,
        items: [...items],
      };

      await this.cartRepo.update({ id }, updatedCart);
    } catch (error) {
      return false;
    }
    return true;
  }

  async removeByUserId(userId): Promise<boolean> {
    try {
      await this.cartRepo.delete({ user_id: userId });
    } catch (error) {
      return false;
    }
    return true;
  }
}
