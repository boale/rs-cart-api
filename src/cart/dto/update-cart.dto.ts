import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { CartItem, CartStatus } from '@prisma/client';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty()
  status: CartStatus;

  @ApiProperty({ example: 'ffff4806-b98d-47e1-a7f5-fe338516a1bd' })
  userId: string;

  @ApiProperty({
    example: [
      {
        id: '276e523a-247f-4fbf-95fb-ccbf616f9713',
        productId: '276e523a-247f-4fbf-95fb-ccbf616f9713',
        count: 1,
      },
    ],
  })
  items: CartItem[];
}
