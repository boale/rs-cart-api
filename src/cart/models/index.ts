export type Product = {
  id: string;
  title?: string;
  description?: string;
  price?: number;
};

export type CartItem = {
  product: Product;
  count: number;
  cart_id: string;
};

export type Cart = {
  id: string;
  items: CartItem[];
};
