import { Controller, Get, Delete, Put, Body, Req, Post, HttpStatus } from '@nestjs/common';

import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get('/:userId')
  async findUserCart(@Req() req) {
    console.log("GET START")

    try {
      const { cart, items } = await this.cartService.findListsByUserId(req.params.userId);

        return {
          statusCode: HttpStatus.OK,
          message: 'OK',
          data: { ...cart.rows[0], items: items.rows || [] },
        };
    } catch (err) {
      console.log('error on getting cart by id: ', err);
      return {
        err,
      };
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put('/:userId')
  async updateUserCart(@Req() req, @Body() body) {
    console.log("PUT START")
    const item = body;

    const { adjustedItem, cart } = await this.cartService.updateByUserId(req, item)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        adjustedItem,
        // total: calculateCartTotal(cart),
      }
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete('/:productId')
  async clearUserCart(@Req() req) {
    console.log("DELETE START")
    await this.cartService.removeByUserId(req.params.productId);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout')
  checkout(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    const cart = this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode

      return {
        statusCode,
        message: 'Cart is empty',
      }
    }

    const { id: cartId, items } = cart;
    const total = calculateCartTotal(cart);
    const order = this.orderService.create({
      ...body, // TODO: validate and pick only necessary data
      userId,
      cartId,
      items,
      total,
    });
    this.cartService.removeByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order }
    }
  }
}
