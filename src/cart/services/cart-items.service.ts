import { Injectable } from '@nestjs/common';

import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Product } from '../models';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async updateItemsByCart(cartId, items: CartItem[]): Promise<CartItem[]> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.query(
        `DELETE FROM "cart_items" WHERE "cart_id" = $1`,
        [cartId],
      );
      const cartItems = this.cartItemRepository.create(
        items.map((item) => ({ ...item, cart: { id: cartId } })),
      );
      const res = await queryRunner.manager.save(cartItems);
      await queryRunner.commitTransaction();
      return res;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async removeCartItemById(cartId, productId) {
    await this.cartItemRepository.delete({
      cart: { id: cartId },
      product_id: productId,
    });
  }

  async saveCartItem(cartId, productId, count) {
    const cartItem = this.cartItemRepository.create({
      cart: { id: cartId },
      product_id: productId,
      count,
    });
    await this.cartItemRepository.save(cartItem);
  }

  async upsertItemByCart(cartId, product: Product, count) {
    console.log(cartId, product);
    const cartItem = await this.cartItemRepository.findOneBy({
      cart: { id: cartId },
      product_id: product.id,
    });
    if (cartItem) {
      cartItem.count = count;
      await this.cartItemRepository.save(cartItem);
    } else {
      await this.saveCartItem(cartId, product.id, count);
    }
  }
}
