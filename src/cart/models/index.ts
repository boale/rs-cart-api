export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  genre: string;
  release_date: string;
  image: string;
};


export type CartItem = {
  product: Product,
  count: number,
}

export type Cart = {
  id: string,
  items: CartItem[],
}
