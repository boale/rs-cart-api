import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { OrderStatus } from 'src/order/type';
import { User } from './user.entity';

export interface PaymentData {
  method: string;
  card_last4?: number;
  email?: string;
  amount: number;
}

export interface DeliveryData {
  address: string;
  city: string;
  zip: string;
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  user_id: string;

  @Column({ name: 'cart_id', type: 'uuid' })
  cart_id: string;

  // @Column('jsonb')
  // items: Array<{ productId: string; count: number }>;

  @Column('jsonb')
  payment: PaymentData;

  @Column('jsonb')
  delivery: DeliveryData;

  @Column('text', { nullable: true })
  comments: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Open,
  })
  status: OrderStatus;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  total: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @ManyToOne(() => Cart, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
