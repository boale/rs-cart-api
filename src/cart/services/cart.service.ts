import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';

import { UsersService } from '../../users';

@Injectable()
export class CartService {
  userCarts: Record<string, Cart>;

  constructor(private userService: UsersService) {
    this.userCarts = {};
  }

  findByUserId(userId: string): Cart {
    return this.userCarts[userId];
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

  findOrCreateByUserId(userId: string) {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId, data) {

  }

  removeByUserId(userId) {
    this.userCarts[ userId ] = null;
  }

}
