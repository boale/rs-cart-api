import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { CartItem } from './cart-item.entity';
import { Cart, CartStatus } from './cart.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  cartId: string;

  @Column({ type: 'json' })
  payment: string;

  @Column({ type: 'json' })
  delivery: string;

  @Column({ type: 'text' })
  comments: string;

  @Column({ type: 'enum', enum: CartStatus })
  status: CartStatus;

  @Column({ type: 'integer' })
  total: number;

  @OneToOne(() => Cart)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart;
}