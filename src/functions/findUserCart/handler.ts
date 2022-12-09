import {
  formatErrorJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { CartService } from 'src/cart';
import { CartController } from 'src/cart/cart.controller';
import { OrderService } from 'src/order';
import { AppRequest } from 'src/shared';

const findUserCart: ValidatedEventAPIGatewayProxyEvent<void> = async (
  event
) => {
  console.log('Get car with id ' + JSON.stringify(event.pathParameters));
  try {
    const { userId } = event.pathParameters;
    const cartController = new CartController(
      new CartService(),
      new OrderService()
    );

    console.log('cartController');
    const { data } = await cartController.findUserCart({
      user: {
        id: userId,
      },
    } as AppRequest);
    return formatJSONResponse({
      data: data,
    });
  } catch (error) {
    formatErrorJSONResponse(error, 500);
  }
};

export const main = middyfy(findUserCart);
