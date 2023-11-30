import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Cart, Order, Status } from '../../database/entities';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(data: any) {
    try {
      await this.connection.transaction(async entityManager => {
        const transactionalOrderRepo = entityManager.getRepository(Order);
        const transactionalCartRepo = entityManager.getRepository(Cart);
        await transactionalOrderRepo.insert({
          userId: data.userId,
          cartId: data.cartId,
          payment: data.payment ?? null,
          delivery: data.delivery ?? null,
          comments: data.comments ?? null,
          status: data.status,
          total: data.total,
        });
        await transactionalCartRepo.update(
          { userId: data.userId },
          { status: Status.ORDERED },
        );
      });
      return await this.orderRepo.findOne({ where: { userId: data.userId } });
    } catch (err) {
      console.error('create: error', err);
      return null;
    }
  }
}
