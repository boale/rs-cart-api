// import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { User } from '../entities/user.entity';

// @Controller('api/auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {
//     console.log(
//       'AuthController AuthService:',
//       this.authService ? 'Injected' : 'Undefined',
//     );
//   }

//   @Post('register')
//   async register(@Body() body: Partial<User>) {
//     return this.authService.register(body);
//   }

//   @Post('login')
//   @UseGuards(AuthGuard('basic'))
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }
// }
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log(
      'AuthController AuthService:',
      this.authService ? 'Injected' : 'Undefined',
    );
  }

  @Post('register')
  async register(@Body() body: Partial<User>) {
    console.log('AuthController.register body:', body);
    return this.authService.register(body);
  }

  @Post('login')
  @UseGuards(AuthGuard('basic'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
