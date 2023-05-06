import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', nullable: false })
  count: number;

  @ManyToOne(
    () => Product,
    product => product.id,
  )
  @JoinColumn({ name: 'id' })
  product: Product;
}
