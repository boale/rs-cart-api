import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  HttpStatus,
  Query,
  Post,
  Request,
} from '@nestjs/common';
import { OrderService } from '../order';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';
// import { Cart, Status } from '../database/entities';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Query('userId') userId: string) {
    const cart = await this.cartService.findOrCreateByUserId(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: await calculateCartTotal(
          cart,
          await this.cartService.getProducts(),
        ),
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Query('userId') userId: string, @Body() body) {
    const cart = await this.cartService.updateCartItemByUserId(userId, body);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: await calculateCartTotal(
          cart,
          await this.cartService.getProducts(),
        ),
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Query('userId') userId: string) {
    await this.cartService.removeByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(
    @Request() req,
    @Query('userId') userId: string,
    @Body() body,
  ) {
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.cartItems.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    const { id: cartId } = cart;
    const total = await calculateCartTotal(
      cart,
      await this.cartService.getProducts(),
    );
    const order = await this.orderService.create({
      ...body,
      userId,
      cartId,
      total,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'OK',
      data: { order },
    };
  }
}
