export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};


export type CartItem = {
  product: Product,
  count: number,
}

export type CartStatus = "OPEN" | "ORDERED";

export type Cart = {
  id: string,
  status: CartStatus,
  items: CartItem[],
}

export type CartOperation = {
  success: boolean,
  cart?: Cart,
  error?: string,
};