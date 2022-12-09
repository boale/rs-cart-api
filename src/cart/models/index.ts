export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type CartItem = {
  product: Product;
  count: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
};

export const cartTableName = '"carts"';

export const cartItemTableName = '"cart_items"';
