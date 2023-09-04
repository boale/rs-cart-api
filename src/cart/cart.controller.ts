import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { UsersService } from '../users';
import {
  AppRequest,
  closeSharedConnection,
  createSharedConnection, HEADERS,
} from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';


@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private usersService: UsersService
  ) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const userId = req.query.userId as string;
    const cart = await this.cartService.findOrCreateByUserId(req.query.userId as string);
    const user = await this.usersService.findOne(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      headers: HEADERS,
      data: { cart, total: calculateCartTotal(cart), user },
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) { // TODO: validate body payload...
    const cart = await this.cartService.updateByUserId(body)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      headers: HEADERS,
      data: {
        cart,
        total: calculateCartTotal(cart),
      }
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    await this.cartService.removeByUserId(req.query.userId as string);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      headers: HEADERS,
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Body() body) {
    const { userId } = body;
    const sharedConn = await createSharedConnection();
    try {
      await sharedConn.query('BEGIN')
      const cart = await this.cartService.findByUserId(userId, sharedConn);

      if (!(cart && cart.items.length)) {
        const statusCode = HttpStatus.BAD_REQUEST;

        return {
          statusCode,
          message: 'Cart is empty',
        }
      }

      const { id: cartId, items } = cart;
      const total = calculateCartTotal(cart);
      const order = await this.orderService.create({
        ...body, // TODO: validate and pick only necessary data
        userId,
        cartId,
        items,
        total,
      }, sharedConn);
      await this.cartService.updateCartStatus(cartId, sharedConn);
      await sharedConn.query(
        `update carts set status = 'ORDERED' where id = $1;`,
        [cartId],
      );
      await sharedConn.query('COMMIT');

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        headers: HEADERS,
        data: { order }
      }
    } catch (e) {
      await sharedConn.query('ROLLBACK');
      console.log('transaction failed');
    } finally {
      await closeSharedConnection();
    }
  }
}
