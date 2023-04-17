import { Controller, Get, Delete, Put, Body, Req, HttpStatus } from '@nestjs/common';

import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
  ) { }

  @Get(':userId')
  async findCart(@Req() req) {
    try {
      const { cart, items } = await this.cartService.getCarts(req.params.userId);

        return {
          statusCode: HttpStatus.OK,
          message: 'OK',
          data: { ...cart.rows[0], items: items.rows || [] },
        };
    } catch (err) {
      console.log('Error on controller findUserCart: ', err);
      return {
        err
      };
    }
  }

  @Put(':userId')
  async updateCart(@Req() req, @Body() body) {
    try {
      const { adjustedItem, cart } = await this.cartService.updateCartItem(req, body)

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: {
          cart,
          adjustedItem,
        }
      }
    } catch (err) {
      console.log('Error on controller updateCart: ');
      return { err }
    }
  }

  @Delete(':productId')
  async removeCartItem(@Req() req) {
   try {
     await this.cartService.removeCartItem(req.params.productId);
     return {
       statusCode: HttpStatus.OK,
       message: 'OK',
     }
   } catch (err) {
     console.log('Error on controller clearUserCart: ', err);
     return { err }
     }
  }
}
