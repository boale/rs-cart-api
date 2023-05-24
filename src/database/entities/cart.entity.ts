import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { User } from './user.entity';

export enum CartStatus {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'cart_id'})
  items: CartItem[];

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User

  @Column({ type: 'date', nullable: false })
  createdAt: Date;

  @Column({ type: 'date', nullable: false })
  updatedAt: Date;

  @Column({ type: 'enum', enum: CartStatus, nullable: false })
  status: CartStatus;
}
