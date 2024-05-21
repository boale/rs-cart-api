import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { v4 } from 'uuid';
import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private readonly userCarts: typeof Cart
  ) {}

  async findByUserId(userId: string) {
    return await this.userCarts.findOne({
      where: { user_id: userId }
    })
  }

  async createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      user_id: userId,
      status: 'OPEN'
    }

    const cart = await this.userCarts.create({
      ...userCart
    })

    return await cart.save()
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(updatedCart: Cart) {
    const cart = await this.findOrCreateByUserId(updatedCart.user_id);

    cart.status = updatedCart.status

    return await cart.save()
  }

  removeByUserId(userId) {
    this.userCarts.destroy({
      where: {
        user_id: userId
      }
    })
  }
}
