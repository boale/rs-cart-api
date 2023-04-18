import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CartItems } from './cart-items.entity';

export enum Status {
  Open = 'OPEN',
  Ordered = 'ORDERED',
}

@Entity()
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'date', nullable: false })
  createdAt: string;

  @Column({ type: 'date', nullable: false })
  updatedAt: string;

  @Column({ type: 'enum', enum: Status, default: Status.Open })
  status: Status;

  @OneToMany(
    () => CartItems,
    cartItems => cartItems.cart,
    { cascade: ['insert', 'update', 'remove', 'soft-remove'] },
  )
  // @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
  cartItems: CartItems[];
}
