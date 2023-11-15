import { Entity, ManyToOne, PrimaryColumn, Column } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryColumn('uuid')
  cart_id: string;

  @PrimaryColumn({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'integer', default: 0 })
  count: number;

  @ManyToOne(
    () => Cart,
    cart => cart.items,
  )
  cart: Cart;
}
