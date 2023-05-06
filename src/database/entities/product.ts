import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'integer', nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: false })
  count: number;

  @Column({ type: 'text', nullable: false })
  genre: string;

  @Column({ type: 'text', nullable: false })
  release_date: string;

  @Column({ type: 'text', nullable: false })
  image: string;
}
