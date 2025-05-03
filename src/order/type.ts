export enum OrderStatus {
  Open = 'OPEN',
  Approved = 'APPROVED',
  Confirmed = 'CONFIRMED',
  Sent = 'SENT',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}

export type StatusHistory = Array<{
  status: OrderStatus;
  timestamp: number;
  comment: string;
}>;

export type Address = {
  address: string;
  firstName: string;
  lastName: string;
  comment: string;
};
export type CreateOrderDto = {
  items: Array<{ productId: string; count: 1 }>;
  payment: {
    amount: number;
    method: string;
    card_last4: number;
  };
  delivery: {
    zip: string;
    city: string;
    address: string;
  };
  comments: string | null;
  status: string;
  total: number;
};

export type PutCartPayload = {
  product: { description: string; id: string; title: string; price: number };
  count: number;
};
export type CreateOrderPayload = {
  userId: string;
  cart_id: string;
  items: Array<{ productId: string; count: number }>;
  address: Address;
  total: number;
};
