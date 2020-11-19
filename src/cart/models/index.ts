
export type CartItem = {
  id?: string,
}

export type Cart = {
  id: string,
  items: CartItem[],
}
