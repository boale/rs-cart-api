import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../../database/entities/cart-item.entity';
import { Cart, CartStatus } from '../../database/entities/cart.entity';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return  await this.cartRepository.findOne({
      where: { userId: userId, status: CartStatus.OPEN },
      relations: ['items', 'items.product'],
    });
  }

  async createByUserId(userId: string): Promise<Cart> {
    const cart = new Cart();
    cart.id = uuidv4();
    cart.userId = userId;
    cart.createdAt = new Date();
    cart.updatedAt = new Date();
    cart.status = CartStatus.OPEN;
    return await this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, {count, product}) {
    const { id: cartId } = await this.findOrCreateByUserId(userId);
    let cartItem = await this.cartItemRepository.findOne({
      where: { cartId, productId: product.id },
    });
    if (cartItem) {
      if (count > 0) {
        cartItem.count = count;
        await this.cartItemRepository.save(cartItem);
      } else {
        await this.cartItemRepository.remove(cartItem);
      }
    } else {
      cartItem = new CartItem();
      cartItem.cartId = cartId;
      cartItem.productId = product.id;
      cartItem.count = count;

      await this.cartItemRepository.save(cartItem);
    }

    return cartItem;
  }

  async removeByUserId(userId): Promise<void> {
    const userCart = await this.cartRepository.findOne({
      where: { userId },
    });

    await this.cartItemRepository.delete({ cart: userCart });
    await this.cartRepository.remove(userCart);
  }

}
