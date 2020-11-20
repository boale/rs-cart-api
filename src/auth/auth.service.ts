import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/models';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  validateUser(username: string, pass: string): any {
    const user = this.usersService.findOne(username);

    if (user) {
      const { password, ...result } = user;

      return result;
    }

    return this.usersService.createOne({ name: username })
  }

  login(user: User) {
    const payload = { username: user.name, sub: user.id };

    return {
      token_type: 'Bearer',
      access_token: this.jwtService.sign(payload),
    };
  }
}
