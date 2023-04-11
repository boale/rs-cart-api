import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
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

    @ManyToOne(() => User, {
        eager: true,
    })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'enum', enum: CartStatus, nullable: false })
    status: CartStatus;

    @OneToMany(() => CartItem, (item) => item.cart, {
        cascade: true,
        eager: true,
    })
    items: CartItem[];
}
