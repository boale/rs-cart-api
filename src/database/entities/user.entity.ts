import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @OneToMany(() => Cart, (cart) => cart.user, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id'})
  items: Cart[];
}
