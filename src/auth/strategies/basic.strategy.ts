// import {
//   forwardRef,
//   Inject,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';

// import { BasicStrategy as Strategy } from 'passport-http';

// import { AuthService } from '../auth.service';

// @Injectable()
// export class BasicStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @Inject(forwardRef(() => AuthService))
//     private authService: AuthService,
//   ) {
//     super({ passReqToCallback: true });
//   }

//   async validate(username: string, pass: string, req: any): Promise<any> {
//     console.log(
//       'Headers Reaching Passport:',
//       JSON.stringify(req.headers, null, 2),
//     );
//     console.log('Parsed Username:', username, 'Password:', pass);
//     const user = await this.authService.validateUser(username, pass);

//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     return user;
//   }
// }
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { BasicStrategy as Strategy } from 'passport-http';
// import { UsersService } from '../../users/services/users.service';

// @Injectable()
// export class BasicStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly usersService: UsersService) {
//     super();
//   }

//   async validate(username: string, password: string): Promise<any> {
//     const user = await this.usersService.findOne(username);
//     if (user && user.password === password) {
//       return {
//         id: user.id, // This should be the correct UUID from the DB
//         username: user.email, // Assuming 'email' is used as username
//       };
//     }
//     throw new UnauthorizedException();
//   }
// }
// import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { BasicStrategy as Strategy } from 'passport-http';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class BasicStrategy extends PassportStrategy(Strategy) {
//   private readonly logger = new Logger(BasicStrategy.name);

//   constructor(private readonly authService: AuthService) {
//     super();
//     this.logger.log(
//       'AuthService:',
//       this.authService ? 'Injected' : 'Undefined',
//     );
//   }

//   async validate(username: string, password: string): Promise<any> {
//     this.logger.log(`Validate Username: ${username}, Password: ${password}`);
//     const user = await this.authService.validateUser(username, password);
//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     return { id: user.id, username: user.email };
//   }
// }
// import { BasicStrategy as Strategy } from 'passport-http';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class BasicStrategy extends PassportStrategy(Strategy) {
//   private readonly logger = new Logger(BasicStrategy.name);

//   constructor(private authService: AuthService) {
//     super(); // Nest handles the passport-http config
//     this.logger.log(
//       'AuthService:',
//       this.authService ? 'Injected' : 'Undefined',
//     );
//   }

//   async validate(username: string, password: string): Promise<any> {
//     this.logger.log(`Validate Username: ${username}, Password: ${password}`);
//     const user = await this.authService.validateUser(username, password);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
// import { BasicStrategy as Strategy } from 'passport-http';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
//   private readonly logger = new Logger(BasicStrategy.name);

//   constructor(private authService: AuthService) {
//     super(); // No args needed—Nest handles the verify callback
//     this.logger.log(
//       'AuthService:',
//       this.authService ? 'Injected' : 'Undefined',
//     );
//   }

//   async validate(username: string, password: string): Promise<any> {
//     this.logger.log(`Validate Username: ${username}, Password: ${password}`);
//     const user = await this.authService.validateUser(username, password);
//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     return user;
//   }
// // }
import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  private readonly logger = new Logger(BasicStrategy.name);

  constructor(private authService: AuthService) {
    super();
    this.logger.log(
      'AuthService:',
      this.authService ? 'Injected' : 'Undefined',
    );
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.log(`Validate Username: ${username}, Password: ${password}`);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
