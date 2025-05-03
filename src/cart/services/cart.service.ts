import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../entities/cart.entity';
import { CartItem } from '../../entities/cartItem.entity';
import { CartStatuses } from '../models';
import { PutCartPayload } from 'src/order/type';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async getCartById(cartId: string): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });
  }

  async findByUserId(user_id: string): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { user_id, status: CartStatuses.OPEN },
      relations: ['items'],
    });
  }

  async findByUserIdToDelete(user_id: string): Promise<Cart[]> {
    return this.cartRepository.find({
      where: { user_id },
      relations: ['items'],
    });
  }

  async createByUserId(user_id: string): Promise<Cart> {
    const timestamp = new Date();

    const userCart = this.cartRepository.create({
      id: randomUUID(),
      user_id,
      created_at: timestamp,
      updated_at: timestamp,
      status: CartStatuses.OPEN,
      items: [],
    });

    return this.cartRepository.save(userCart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    let userCart = await this.findByUserId(userId);

    if (!userCart) {
      userCart = await this.createByUserId(userId);
    }

    return userCart;
  }

  async updateByUserId(
    user_id: string,
    payload: PutCartPayload,
  ): Promise<Cart> {
    const userCart = await this.findOrCreateByUserId(user_id);

    const index = userCart.items.findIndex(
      ({ product_id }) => product_id === payload.product.id,
    );

    if (index === -1) {
      const cartItem = this.cartItemRepository.create({
        product_id: payload.product.id,
        count: payload.count,
        cart: userCart,
      });
      userCart.items.push(cartItem);
      await this.cartItemRepository.save(cartItem);
    } else if (payload.count === 0) {
      await this.cartItemRepository.delete({
        cart: { id: userCart.id },
        product_id: payload.product.id,
      });
      userCart.items.splice(index, 1);
    } else {
      userCart.items[index].count = payload.count;
      await this.cartItemRepository.save(userCart.items[index]);
    }

    return this.cartRepository.save(userCart);
  }

  async removeByUserId(userId: string): Promise<void> {
    const userCart = await this.findByUserIdToDelete(userId);

    if (userCart.length > 0) {
      for (const cart of userCart) {
        await this.cartItemRepository.delete({ cart: { id: cart.id } });
      }
    }
  }
}
