import { ApiProperty } from '@nestjs/swagger';
import { CartItem, CartStatus } from '@prisma/client';

export class CreateCartDto {
  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: CartStatus, enumName: 'CartStatus' })
  status: CartStatus;

  @ApiProperty({
    example: [
      {
        productId: '276e523a-247f-4fbf-95fb-ccbf616f9713',
        count: 1,
      },
    ],
  })
  items: CartItem[];
}
