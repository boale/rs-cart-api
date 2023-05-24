import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { CartItem } from '../../database/entities/cart-item.entity';
import { Cart, CartStatus } from '../../database/entities/cart.entity';
import { calculateCartTotal } from '../../cart/models-rules';
import { CartService } from '../../cart/services/cart.service';
import { Order } from '../../database/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  userId = '1a95c74f-924b-4076-b84a-173274078194';
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private cartService: CartService,
  ) {}

  async findAll() {
    const orders = await this.orderRepository.find({relations: ['cart', 'cart.items']});

    return orders;
  }

  async create(data) {
    const cart = await this.cartService.findByUserId(this.userId);
    const { id: cartId } = cart;
    const total = calculateCartTotal(cart);

    let newOrder;
    await getConnection().transaction(async entityManager => {
      const cart = await entityManager.findOne(Cart, cartId, {
        relations: ['items'],
      });
      newOrder = new Order();
      newOrder.cartId = cartId;
      newOrder.userId = this.userId;
      newOrder.total = total;
      newOrder.status = CartStatus.ORDERED;
      newOrder.comments = data.address.comment;
      newOrder.payment = data.payment;
      newOrder.delivery = JSON.stringify({
        firstName: data.address.firstName, 
        lastName: data.address.lastName,
        address: data.address.address,
      });
      await entityManager.save(newOrder);
      cart.status = CartStatus.ORDERED;
      await entityManager.save(cart);
    });

    return newOrder;
  }

    async deleteOrder(id) {
      await this.orderRepository.delete({id});

      return id;
  }

  // update(orderId, data) {
  //   const order = this.findById(orderId);

  //   if (!order) {
  //     throw new Error('Order does not exist.');
  //   }

  //   this.orders[ orderId ] = {
  //     ...data,
  //     id: orderId,
  //   }
  // }
}
