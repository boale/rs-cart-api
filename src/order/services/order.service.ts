import { Injectable } from '@nestjs/common';
import { Order as IOrder } from '../models';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from '../../database/entities/order.entity';
import { Cart, CartStatus } from '../../database/entities/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async findById(orderId: string): Promise<IOrder> {
    return await this.orderRepository.findOne(orderId);
  }

  async create(data: any): Promise<IOrder> {
    const order = this.orderRepository.create({
      user: {
        id: data.userId,
      },
      cart: {
        id: data.cartId,
      },
      payment: data.payment,
      delivery: data.delivery,
      comments: data.comments,
      status: OrderStatus.OPEN,
      total: data.total,
    });

    const userCart = await this.cartRepository.findOne({
      where: { user: { id: data.userId }, status: CartStatus.OPEN },
    });
    userCart.status = CartStatus.ORDERED;

    await this.entityManager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(userCart);
      await transactionalEntityManager.save(order);
    });

    return order;
  }

  async update(orderId, data): Promise<IOrder> {
    const order = await this.orderRepository.findOne(orderId);
    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orderRepository.merge(order, data);
    return await this.orderRepository.save(order);
  }
}
