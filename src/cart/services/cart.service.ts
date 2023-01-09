import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, Product } from '../models';
import { DatabaseService } from '../../db/db.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  constructor(
    private dataBase: DatabaseService,
    private readonly httpService: HttpService,
  ) {}

  async getProductsList(): Promise<Product[]> {
    const url =
      process.env.PRODUCTS_LIST_URL ??
      'https://16zpz4tfm7.execute-api.eu-west-1.amazonaws.com/products';
    const data = await this.httpService.get<Product[]>(url).toPromise();
    return data.data;
  }

  async getByCartId(cartId: string) {
    const items = await this.dataBase.db.query<{
      cart_id: string;
      product_id: string;
      count: number;
    }>(
      'select cart_items.* from cart_items where cart_items.cart_id=:cartId order by cart_items.product_id',
      { cartId },
    );
    return items;
  }

  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.dataBase.db.query<{
      id: string;
      user_id: string;
      created_at: string;
      updated_at: string;
    }>(
      'select carts.* from carts where carts.user_id=:userId order by created_at DESC',
      { userId },
    );
    const cartId = cart?.[0]?.id;
    if (!cartId) {
      return undefined;
    }

    const products = await this.getProductsList();
    const items = await this.getByCartId(cartId);
    return {
      id: cartId,
      items:
        items?.map(({ product_id, count }) => ({
          count,
          product: products?.find(item => item?.id === product_id),
        })) ?? [],
    };
  }

  createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[userId] = userCart;

    return userCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    item: { product: Product; count: number },
  ): Promise<Cart> {
    const { id, items } = await this.findOrCreateByUserId(userId);

    const found = items.find(
      ({ product }) => product?.id === item?.product?.id,
    );
    const params = {
      count: item?.count,
      cart_id: id,
      product_id: item?.product.id,
    };
    if (found) {
      found.count = item?.count ?? found.count;
      if (params.count) {
        await this.dataBase.db.query(
          `update cart_items set count=:count where cart_id=:cart_id and product_id=:product_id`,
          params,
        );
      } else {
        await this.dataBase.db.query(
          'delete from cart_items where cart_id=:cart_id and product_id=:product_id',
          params,
        );
      }
    } else {
      await this.dataBase.db.query(
        'insert into cart_items (count, cart_id, product_id) values (:count, :cart_id, :product_id)',
        params,
      );
    }
    const updatedCart = {
      id,
      items,
    };

    this.userCarts[userId] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
