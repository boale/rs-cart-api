import { Controller, Get, Request, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard, AuthService, JwtAuthGuard, BasicAuthGuard } from './auth';
import { headers } from './constants';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @Get([ '', 'ping' ])
  healthCheck(): any {
	console.log('healthCheck')
    return {
	  statusCode: HttpStatus.OK,
	  headers,
      message: 'OK',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
	console.log('login:', req)
    const token = this.authService.login(req.user, 'basic');

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
	  console.log('getProfile:', req)
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
