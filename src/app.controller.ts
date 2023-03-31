import { Controller, Get, Request, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard, AuthService, JwtAuthGuard, BasicAuthGuard } from './auth';
import { headers } from "./constants";

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @Get([ '', 'ping' ])
  healthCheck(req): any {
    console.log(req);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      headers,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    const token = this.authService.login(req.body, 'basic');

    return  {
      statusCode: HttpStatus.OK,
      message: 'OK',
      headers,
      data: {
        ...token,
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      headers,
      data: {
        user: req.user,
      },
    };
  }
}
