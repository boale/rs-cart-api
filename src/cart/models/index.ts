export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};


export type CartItem = {
  product_id: string,
  count: number,
}

export type  Cart = {
  id: string,
  items: CartItem[],
}
