import { Column, Entity, OneToOne } from 'typeorm';
import { Carts } from "./carts.entity";

@Entity()
export class CartsItems {
    @OneToOne(() => Carts)
    cart_id: string;

    @Column({ type: 'uuid' })
    product_id: string;

    @Column({ type: 'number' })
    count: number;
}