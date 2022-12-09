export interface ICar {
  id: string;
  title: string;
  description: string;
  price: string;
}
export interface IStock {
  product_id: string;
  count: number;
}

export interface IProduct extends ICar {
  count: number;
}
