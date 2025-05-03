import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.logger.log(
      'UsersService:',
      this.usersService ? 'Injected' : 'Undefined',
    );
  }

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log(`Validating user: ${email}`);
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    this.logger.log(
      `Logging in user: ${user.email}, password: ${user.password}`,
    );
    function createToken(user: User) {
      const { email, password } = user;
      const buffer = Buffer.from([email, password].join(':'), 'utf8');

      return buffer.toString('base64');
    }
    return {
      token_type: 'Basic',
      access_token: createToken(user),
    };
  }

  async register(userData: Partial<User>): Promise<any> {
    console.log('AuthService.register body:', userData); // Debug input
    this.logger.log(`Registering user: ${userData.email}`);
    const existingUser = await this.usersService.findOne(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const newUser = await this.usersService.createOne({
      ...userData,
      password: userData.password,
    });
    return this.login(newUser);
  }
}
