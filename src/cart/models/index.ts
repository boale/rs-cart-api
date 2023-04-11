export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};

export enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED'
}

export type CartItem = {
  product: Product,
  count: number,
}

export type Cart = {
  id: string,
  items: CartItem[],
  status: Status
}
