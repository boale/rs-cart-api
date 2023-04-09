const cartsData = [
  { 
    user_id: '0faae380-273a-4ce8-9598-396b633eaa98',
    created_at: '2023-02-11',
    updated_at: '2023-02-13',
    status: "OPEN",
  },
  { 
    user_id: '7d95b1a9-523f-4ab3-af55-9bf5858a39c5',
    created_at: '2023-03-27',
    updated_at: '2023-03-28',
    status: "OPEN",
  },
  { 
    user_id: '45e9222d-0ada-431b-aef3-9813da92192e',
    created_at: '2023-03-03',
    updated_at: '2023-03-05',
    status: "OPEN",
  },
];

const cartItemsData = [
  {
    cart_id: '41d03d02-d420-4dae-9cd1-925d06cfb598',
    product_id: '546d3393-65ca-46b6-a002-cddda368d626',
    count: 3,
  },
  { 
    cart_id: 'aea9e961-3a75-4ff0-8a78-2140a43a3308',
    product_id: 'f6c2315f-ec89-48c7-b9b5-cf29ffd8aab3',
    count: 12,
  },
  { 
    cart_id: '86d8c506-594f-405f-b412-a717959a2224',
    product_id: '0b3ee0d7-9a9a-42d5-b786-6d448f8c6ce5',
    count: 8,
  }
];

module.exports = {
  cartsData,
  cartItemsData,
};