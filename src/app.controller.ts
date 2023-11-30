import {Controller, Get, Request, Post, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @Get([ '', 'ping' ])
  healthCheck(): any {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @Post('api/auth/login')
  async login(@Request() req) {
    const token = this.authService.login(req.user, 'basic');

    return  {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        ...token,
      },
    };
  }

  @Get('api/profile')
  async getProfile(@Body() body) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        user: body.user,
      },
    };
  }
}