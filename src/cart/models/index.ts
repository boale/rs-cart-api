import { Column, Model, Table } from 'sequelize-typescript'

@Table
export class Product extends Model {
  @Column
  id: string

  @Column
  title: string;

  @Column
  description: string;

  @Column
  price: number
}

export class Cart extends Model {
  @Column
  id: string;

  @Column
  user_id: string;

  @Column
  status: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;
}

export class CartItem extends Model {
  @Column
  id: string;

  @Column
  card_id: string;

  @Column
  product_id: string;

  @Column
  count: string
}
