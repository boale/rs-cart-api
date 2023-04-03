import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { QueryResult } from 'pg';
import { client } from '../dbClient';
// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
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
  @Get()
    @Get(':cartid')
  async findUserCart(@Req() req: AppRequest) {
    try {
      console.log('req & params!!!: ', req.params, req.params.cartid);
      const cart: QueryResult = await client(
         `select * from carts where id = '${req.params.cartid}';`,
      );
      if (cart) {
        const items = await client(
          `select * from cart_items where cart_id = '${cart.rows[0].id}';`,
        );
        return {
          statusCode: HttpStatus.OK,
          message: 'OK',
          data: {
            cart: { ...cart.rows[0], items: items.rows[0] || [] },
          },
        };
      }
    } catch (err) {
      console.log('error on getting cart by id: ', err);
      return {
        myError: err,
      };
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    try {
      const checkItems = await client(
        `select * from cart_items where cart_id = '${body.cartId}';`,
      );
      let result;
      let updatedItems = [];

 if (checkItems && checkItems.rowCount > 0) {
        const prevJsonbItems = checkItems.rows[0].items;
        if (prevJsonbItems.find(i => i === body.product.id)) {
          updatedItems = prevJsonbItems.map(item => {
            if (item.id === body.product.id) {
              item.count += 1;
              return item;
            }
            return item;
          });
        } else {
          if (Array.isArray(prevJsonbItems)) {
            updatedItems.push(body.product);
          }
        }

        const jsonedItems = JSON.stringify(updatedItems);

        result = await client(
          `update cart_items set items = '${jsonedItems}' where cart_id = '${body.cartId}'`,
        );
      } else {
        result = await client(
          `insert into cart_items (items, cart_id) values ('${JSON.stringify([
            {
              ...body.product,
              count: body.count,
            },
          ])}', '${body.cartId}');`,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: {
          message: `Success on  ${body.cartId} cart update. ${result}`,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Fail on adding product with id ${body.product.id} to cart`,
        err,
      };
    }
  
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  clearUserCart(@Req() req: AppRequest) {
    this.cartService.removeByUserId(getUserIdFromRequest(req));

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
