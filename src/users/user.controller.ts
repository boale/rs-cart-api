import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './services';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() // @Req() req: AppRequest
  {
    const users = await this.userService.getUsers();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { users },
    };
  }
}
