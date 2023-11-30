import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from './cart-item.entity';
import { User } from './user.entity';
import { Order } from './order.entity';

export enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @Column({ type: 'enum', enum: Status, nullable: false })
  status: Status;

  @OneToMany(
    () => CartItem,
    cartItem => cartItem.cart,
    { cascade: true },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  cartItems: CartItem[];

  @OneToMany(
    () => Order,
    order => order.cart,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  orders: Order[];
}
