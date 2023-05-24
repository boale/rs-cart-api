import { Controller, Get, HttpStatus, Put, Body, Delete, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from 'src/auth';

import { CartService } from './services';

@Controller('profile/cart')
export class CartController {
  userId = '1a95c74f-924b-4076-b84a-173274078194';
  constructor(
    private cartService: CartService,
  ) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart() {
    const cart = await this.cartService.findOrCreateByUserId(this.userId);

    return cart.items;
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Body() body) { // TODO: validate body payload...
    const cart = await this.cartService.updateByUserId(this.userId, body)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart }
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart() {
    await this.cartService.removeByUserId(this.userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    }
  }
}
