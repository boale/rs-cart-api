import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, getConnection } from 'typeorm';

import { Orders } from '../../database/entities/orders.entity';
import { Carts, Status } from '../../database/entities/carts.entity';

import { getUserIdFromRequest } from '../../shared/models-rules';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Carts)
    private readonly cartsRepository: Repository<Carts>,
    private dataSource: DataSource,
  ) {}

  private async findById(orderId: string): Promise<Orders> {
    return await this.ordersRepository.findOne({
      where: {
        id: orderId,
      },
      relations: ['carts'],
    });
  }

  async create(data: Orders) {
    const userId = getUserIdFromRequest();

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const carts = await this.cartsRepository.findOne({
        where: {
          userId,
          status: Status.Open,
        },
        relations: ['cartItems'],
      });

      carts.status = Status.Ordered;
      await this.cartsRepository.save(carts);

      const order = {
        userId,
        cartId: carts.id,
        payment: { comment: 'free' },
        delivery: data.delivery,
        comments:
          'why would you need to set up total on Orders as a column table',
        status: 'created',
        total: -1,
      };

      await this.ordersRepository.insert(order);

      await queryRunner.commitTransaction();

      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(orders: Orders) {
    if (!orders.id) {
      return await this.create(orders);
    }

    const ordersUpdate = await this.findById(orders.id);
    const ordersNext = {
      ...ordersUpdate,
      ...orders,
    };

    console.log('update', 'ordersNext', ordersNext);

    return await this.ordersRepository.save(ordersNext);
  }

  async getAll() {
    const userId = getUserIdFromRequest();

    return await this.ordersRepository.find({
      where: {
        userId,
      },
    });
  }

  async getById(id: string) {
    return this.ordersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async putStatusById(
    id: string,
    { status, comments }: { status: string; comments: string },
  ) {
    const orders = await this.getById(id);
    const nextOrders = { ...orders, status, comments };
    console.log('putStatusById', 'nextOrders', nextOrders);

    return await this.ordersRepository.save(nextOrders);
  }

  async deleteById(id: string) {
    return await this.ordersRepository.delete(id);
  }
}
