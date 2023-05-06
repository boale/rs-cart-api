import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cartItem';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => CartItem,
    cartItem => cartItem,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
  items: CartItem[];
}
