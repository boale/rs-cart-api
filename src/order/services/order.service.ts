import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { CreateOrderPayload, StatusHistory } from '../type';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user'], // Fetch user relation for email
    });
  }

  async findAllByUserId(userId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['user'], // Fetch user relation to get email
    });
  }

  async findOneById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    return order;
  }

  async getAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items', 'items.product'],
    });

    return order;
  }

  async create(data: CreateOrderPayload): Promise<Order> {
    try {
      const order = this.orderRepository.create({
        userId: data.userId,
        ...data,
      });
      const savedOrder = await this.orderRepository.save(order);

      return savedOrder;
    } catch (error) {
      throw new BadRequestException('Failed to create order: ' + error.message);
    }
  }

  async update(orderId: string, data: Partial<Order>): Promise<Order> {
    const order = await this.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order does not exist.');
    }

    Object.assign(order, {
      ...data,
      id: orderId,
    });

    return await this.orderRepository.save(order);
  }

  //   async getStatusHistory(orderId: string): Promise<StatusHistory[]> {
  //     const order = await this.orderRepository.findOne({
  //       where: { id: orderId },
  //     });
  //     if (!order) {
  //       throw new NotFoundException(`Order with id ${orderId} not found`);
  //     }

  //     return this.statusHistoryRepository.find({
  //       where: { orderId },
  //       order: { timestamp: 'DESC' },
  //     });
  //   }
  // }
  // async getStatusHistory(orderId: string): Promise<StatusHistory[]> {
  //   const order = await this.orderRepository.findOne({
  //     where: { id: orderId },
  //   });
  //   if (!order) {
  //     throw new NotFoundException(`Order with id ${orderId} not found`);
  //   }

  //   return this.statusHistoryRepository.find({
  //     where: { orderId },
  //     order: { timestamp: 'DESC' },
  //   });
}
