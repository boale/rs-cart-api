import { Injectable } from '@nestjs/common';

import { Cart } from '../entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItemsService } from './cart-items.service';
import { CartItem } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    private cartItemService: CartItemsService,
  ) {}

  findByUserId(userId: string): Promise<Cart> {
    return this.cartRepository.findOne({
      where: { user_id: userId },
      relations: ['items'],
    });
  }

  createByUserId(userId: string): Promise<Cart> {
    const cart = this.cartRepository.create({ user_id: userId });
    return this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const cartItems = await this.cartItemService.updateItemsByCart(id, items);

    return { id, ...rest, items: cartItems };
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartRepository.delete({ user_id: userId });
  }

  async editCartItemByUserId(userId, cartItem: CartItem): Promise<Cart> {
    const { id: cartId } = await this.findOrCreateByUserId(userId);
    if (cartItem.count < 1) {
      await this.cartItemService.removeCartItemById(
        cartId,
        cartItem.product.id,
      );
    } else {
      await this.cartItemService.upsertItemByCart(
        cartId,
        cartItem.product,
        cartItem.count,
      );
    }

    return this.findByUserId(userId);
  }
}
