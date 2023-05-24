import { Controller, Get, Body, Param, Post } from '@nestjs/common';

import { ProductService } from './services';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
  ) { }

  @Get()
  async getProductsList() {
    const products = await this.productService.getProductsList();

    return products
  }

  @Get(`/:productId`)
  async getProductsById(@Param(`productId`) productId: string) {
    const product = await this.productService.getProductsById(productId);

    return product
  }

  @Post()
  async createProduct(@Body() body) {
    const product = await this.productService.createProduct(body);

    return product
  }

}
