import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  HttpStatus,
  Param,
} from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { calculateCartTotal } from './models-rules';
import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get(':id')
  async findUserCart(@Param('id') id: string) {
    const data = await this.cartService.findCartById(id);

    console.log('data:', data);
    return { statusCode: HttpStatus.OK, message: 'OK', data };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get(':id')
  @Delete()
  async clearUserCart(@Param('id') id: string) {
    await this.cartService.removeByUserId(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }
}
