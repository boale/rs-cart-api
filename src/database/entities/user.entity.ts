import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Cart } from './cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @OneToMany(
    () => Order,
    order => order.user,
    { cascade: true },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'order_id' })
  orders: Order[];

  @OneToMany(
    () => Cart,
    cart => cart.user,
    { cascade: true },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  carts: Cart[];
}
