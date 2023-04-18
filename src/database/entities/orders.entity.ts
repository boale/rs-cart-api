import { Column, JoinColumn, OneToOne, Entity, PrimaryColumn } from 'typeorm';
import { Carts } from './carts.entity';

@Entity()
export class Orders {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  cartId: string;

  @OneToOne(() => Carts)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  carts: Carts;

  @Column({ type: 'json' })
  payment: Record<string, string>;

  @Column({ type: 'json' })
  delivery: Record<string, string>;

  @Column({ type: 'text' })
  comments: string;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'int' })
  total: number;
}
