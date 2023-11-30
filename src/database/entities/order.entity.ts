import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Cart } from './cart.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ type: 'uuid', nullable: false })
  cartId: string;

  @ManyToOne(() => Cart, { cascade: true })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart;

  @Column({ type: 'json' })
  payment: JSON;

  @Column({ type: 'json' })
  delivery: JSON;

  @Column({ type: 'text' })
  comments: string;

  @Column({ type: 'text', nullable: false })
  status: string;

  @Column({ type: 'numeric', nullable: false })
  total: string;
}
