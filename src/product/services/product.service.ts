import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../database/entities/product.entity';
import { Stock } from '../../database/entities/stock.entity';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async getProductsList() {
    const stocks = await this.stockRepository.find({relations: ['product'],});
    const productsAndCount = stocks.map((stock) => {
      const product = stock.product;
      return {
        count: stock.count,
        ...product
      }
    })

    return productsAndCount;
  }

  async getProductsById(productId) {
    const stock = await this.stockRepository.findOne({where: { productId }, relations: ['product']});
    const product = stock.product;
    const productAndCount = { count: stock.count, ...product }

    return productAndCount;
  }

  async createProduct({ title, description, count, price }) {
    const id = uuidv4();
    const newProduct = { id, title, description, price };
    const newStock = { productId: id, count };
    await this.productRepository.save(newProduct);
    await this.stockRepository.save(newStock);
    const productAndCount = { count, ...newProduct };

    return productAndCount;
  }

}
