import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Cart, CartOperation } from '../models';
import { CART_WITH_ITEMS_QUERY, CREATE_CART_QUERY, DELETE_CART_BY_USER_ID_QUERY, UPDATE_CART_QUERY } from './queries';
import { getFormattedCurrentDate, runQuery, runUpdateItemsTransaction } from 'src/utils';

@Injectable()
export class CartService {
  async findByUserId(userId: string): Promise<CartOperation> {
    try {
      const cart = await runQuery(
        CART_WITH_ITEMS_QUERY, 
        [userId]
      );

      return {
        success: true,
        cart 
      }
    } catch (error) {
      return {
        success: true,
        error: error.message, 
      }
    };
  }

  async createByUserId(userId: string): Promise<CartOperation>  {
    try {    
      const currentDate = getFormattedCurrentDate();

      await runQuery(
        CREATE_CART_QUERY, 
        [userId, currentDate, currentDate, 'OPEN']
      );
      
      const { cart } = await this.findByUserId(userId);
      
      return {
        success: true,
        cart,
      };
    } catch (error) {
      return {
        success: true,
        error: error.message,
      };
    };
  }

  async findOrCreateByUserId(userId: string): Promise<CartOperation> {
    const { cart: cartByUserId } = await this.findByUserId(userId);

    if (cartByUserId) {
      return {
        success: true,
        cart: cartByUserId
      }
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items, status }: Cart): Promise<CartOperation> {
    try {
      const {
        cart: existingUserCart,
        error: existingCartError,
      } = await this.findOrCreateByUserId(userId);

      if (!existingUserCart) {
        throw new Error(existingCartError);
      }

      const { id: cart_id, ...rest } = existingUserCart;

      if (items && items.length) {
        await runUpdateItemsTransaction(cart_id, items);
      }

      if (status !== rest.status) {
        const currentDate = getFormattedCurrentDate();
        await runQuery(UPDATE_CART_QUERY, [status, currentDate, userId]);
      };

      const updatedCart = {
        id: cart_id,
        ...rest,
        items: [ ...items, ...rest.items ],
      }
      
      return {
        success: true,
        cart: updatedCart,
      };

    } catch(error) {
      return {
        success: true,
        error: error.message,
      };
    }
  }

  async removeByUserId(userId) {
    try {
      await runQuery(DELETE_CART_BY_USER_ID_QUERY, [userId]);

      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    };
  }
}
