import AWS from 'aws-sdk';
import { Controller, Get, Delete, Put, Body, Req, Post, UseGuards, HttpStatus } from '@nestjs/common';
// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';
import { lookup } from '../db/client';
const lambda = new AWS.Lambda();

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    // const userId = req.query.userId;
    const userId = '39bd7798-a059-473d-8f06-01e98c91b307';
    console.log(`User: ${userId}`);
    let carts;

    try {
      if (userId) {
        const result = await lookup(
          `SELECT c.id, c.user_id, c.created_at, c.updated_at, c.status, ci.product_id, ci.count
               FROM cart_items ci
               JOIN carts c ON ci.cart_id = c.id
               WHERE c.user_id = $1`,
          [userId]
        );

        const productIdList = result.rows.map(result => result.product_id);

        await Promise.all(productIdList.map((productId) => {
          const getProductsByIdParams = {
            FunctionName: 'product-service-dev-getProductsById',
            Payload: JSON.stringify({
              pathParameters: { productId }
            })
          };

          return lambda.invoke(getProductsByIdParams).promise();
        })).then((values) => {
          const products = values.map(resp=> JSON.parse(JSON.parse(resp.Payload).body));
          carts = result.rows.reduce((accumulator, cart) => {
            const existingEntry = accumulator.find(entry => entry.id === cart.id);
            const product = products.find(({id}) => id === cart.product_id);

            if (existingEntry) {
              existingEntry.items.push({
                product,
                count: cart.count
              });
            } else {
              accumulator.push({
                ...cart,
                items: [
                  {
                    product,
                    count: cart.count
                  }
                ]
              });
            }

            return accumulator;
          }, []);
        });
      }
    } catch (error) {
      console.error('Error executing query', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        body: JSON.stringify({error: 'Internal Server Error'}),
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: carts.map((cart) => ({
        ...cart,
        total: calculateCartTotal(cart)
      }))[0]?.items,
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
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