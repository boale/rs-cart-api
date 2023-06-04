import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'integer', nullable: false })
  count: number;

  @ManyToOne(
    () => Cart,
    cart => cart.cartItems,
  )
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({ type: 'uuid', nullable: false })
  cart_id: string;
}
