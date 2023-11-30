import { Controller, Get, Delete, Put, Body, Req, Post, HttpStatus } from '@nestjs/common';

import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  @Get()
  async findUserCart(@Body() body: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(getUserIdFromRequest(body));
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    }
  }

  @Put()
  async updateUserCart(@Body() body) { // TODO: validate body payload...
    const cart = await this.cartService.updateByUserId(getUserIdFromRequest(body), body)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
      }
    }
  }

  @Delete()
  async clearUserCart(@Body() body) {
    await this.cartService.removeByUserId(getUserIdFromRequest(body));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    }
  }

  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(body);
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items?.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      (req as any).statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      }
    }

    const { id: cartId, items } = cart;
    const order = this.orderService.create({
      ...body, // TODO: validate and pick only necessary data
      userId,
      cartId,
      items,
    });
    await this.cartService.removeByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order }
    }
  }
}