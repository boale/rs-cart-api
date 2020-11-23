import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus } from '@nestjs/common';

import { JwtAuthGuard } from '../auth';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  findUserCart(@Req() req: AppRequest) {
    const cart = this.cartService.findOrCreateByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart, total: calculateCartTotal(cart) },
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateUserCart(@Req() req: AppRequest, @Body() body) { // TODO: validate body payload...
    const cart = this.cartService.updateByUserId(getUserIdFromRequest(req), body)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: calculateCartTotal(cart),
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  clearUserCart(@Req() req: AppRequest) {
    this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  checkout() {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { }
    }
  }
}
