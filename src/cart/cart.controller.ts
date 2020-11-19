import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus } from '@nestjs/common';

import { Request } from 'express';

import { CartService } from './services';
import { JwtAuthGuard } from '../auth';


@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
  ) { }


  @UseGuards(JwtAuthGuard)
  @Get()
  findUserCart(@Req() req: Request) {
    const cart = this.cartService.findOrCreateByUserId(this.getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateUserCart(@Req() req: Request, @Body() body) {
    this.cartService.updateByUserId(this.getUserIdFromRequest(req), body)

    const cart = this.cartService.findByUserId(this.getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  clearUserCart(@Req() req: Request) {
    this.cartService.removeByUserId(this.getUserIdFromRequest(req));

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

  private getUserIdFromRequest(request: Request): string {
    return request.user && (request.user as any).id;
  }

}
