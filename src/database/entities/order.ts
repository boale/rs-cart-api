import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart';
import { CartItem } from './cartItem';

export enum OrderFormat {}
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'json', nullable: false })
  payment: Record<string, unknown>;

  @Column({ type: 'json', nullable: false })
  delivery: Record<string, unknown>;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'text', nullable: false })
  status: string;

  @Column({ type: 'integer', nullable: false })
  total: number;

  @ManyToOne(
    () => Cart,
    cart => cart.id,
  )
  @JoinColumn({ name: 'cart_id' })
  cart_id: Cart;

  @OneToMany(
    () => CartItem,
    cartItem => cartItem,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
  items: CartItem[];
}
