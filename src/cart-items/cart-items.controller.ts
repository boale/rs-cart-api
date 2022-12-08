import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  HttpStatus,
} from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { AppRequest } from '../shared';

import { CartItemsService } from './services';

@Controller('api/profile/:cartId/cart-items')
export class CartItemsController {
  constructor(
    private CartItemsService: CartItemsService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async getCartItemsByCartId(@Req() req: AppRequest) {
    console.log('getCartItemsByCartId:', req);
    const items = await this.CartItemsService.getCartItemsByCartId(req.params.cartId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { items },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  async removeCartIemById(@Req() req: AppRequest) {
    const cartItems = await this.CartItemsService.removeCartIemById(req.params.cartId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: cartItems,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async addItemToCart(@Req() req: AppRequest, @Body() body) {
    console.log('addItemToCart', req.params);
    await this.CartItemsService.addItemToCart(req.params.cartId, body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }
}
