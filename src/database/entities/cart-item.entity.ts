import { Column, Entity, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
    @ManyToOne(() => Cart, (card) => card.items, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    cart: Cart;

    @ManyToOne(() => Product, {
        primary: true,
        eager: true,
    })
    product: Product;

    @Column({ type: 'int', nullable: false })
    count: number;
}
