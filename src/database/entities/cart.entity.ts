import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cartItem.entity';

enum cartstatus {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'date', nullable: false })
  created_at: Date;

  @Column({ type: 'date', nullable: false })
  updated_at: Date;

  @Column({ type: 'enum', nullable: false })
  status: cartstatus;

  @OneToMany(
    () => CartItem,
    cartItem => cartItem.cart,
  )
  cartItems: CartItem[];
}
