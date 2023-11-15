import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { Cart } from '../../database/entities/cart.entity';
import { CartItem } from '../../database/entities/cart_item.entity';

const client = new DynamoDBClient();

const getCartItemCommand = (productId: string) =>
  new QueryCommand({
    TableName: 'products',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': { S: productId },
    },
  });

/**
 * @param {Cart} cart
 * @returns {number}
 */
export async function calculateCartTotal(cart: Cart): Promise<number> {
  return cart
    ? cart.items.reduce(
        async (acc: Promise<number>, { product_id, count }: CartItem) => {
          const getCartItem = getCartItemCommand(product_id);
          const response = await client.send(getCartItem);
          const product = response.Items[0];
          const total = (await acc) + +product.price.S * count;
          return Promise.resolve(total);
        },
        Promise.resolve(0),
      )
    : 0;
}
