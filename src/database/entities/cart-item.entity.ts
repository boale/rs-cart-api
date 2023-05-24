import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  cartId: string;

  @Column('uuid')
  productId: string;

  @ManyToOne(() => Cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart;

  @Column({ type: 'integer', default: 1 })
  count: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}