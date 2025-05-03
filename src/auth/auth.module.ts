// import { Module, Logger } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { BasicStrategy } from './strategies';
// import { UsersService } from '../users/services/users.service';
// import { User } from '../entities/user.entity';
// import { AuthController } from './auth.controller';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     JwtModule.register({
//       secret: 'your-secret-key',
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   controllers: [AuthController], // Remove AuthController from here
//   providers: [
//     UsersService,
//     {
//       provide: AuthService,
//       useFactory: (usersService: UsersService, jwtService: JwtService) => {
//         Logger.log(
//           'AuthService initializing with UsersService:',
//           usersService ? 'Injected' : 'Undefined',
//         );
//         return new AuthService(usersService, jwtService);
//       },
//       inject: [UsersService, JwtService],
//     },
//     {
//       provide: BasicStrategy,
//       useFactory: (authService: AuthService) => {
//         Logger.log(
//           'BasicStrategy initializing with AuthService:',
//           authService ? 'Injected' : 'Undefined',
//         );
//         return new BasicStrategy(authService);
//       },
//       inject: [AuthService],
//     },
//     {
//       provide: AuthController,
//       useFactory: (authService: AuthService) => {
//         Logger.log(
//           'AuthController initializing with AuthService:',
//           authService ? 'Injected' : 'Undefined',
//         );
//         return new AuthController(authService);
//       },
//       inject: [AuthService],
//     },
//   ],
//   exports: [AuthService, UsersService],
// })
// export class AuthModule {
//   constructor() {
//     Logger.log('AuthModule initialized');
//   }
// }
import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { BasicStrategy } from './strategies';
import { UsersService } from '../users/services/users.service';
import { User } from '../entities/user.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    {
      provide: AuthService,
      useFactory: (usersService: UsersService, jwtService: JwtService) => {
        Logger.log(
          'AuthService initializing with UsersService:',
          usersService ? 'Injected' : 'Undefined',
        );
        return new AuthService(usersService, jwtService);
      },
      inject: [UsersService, JwtService],
    },
    {
      provide: BasicStrategy,
      useFactory: (authService: AuthService) => {
        Logger.log(
          'BasicStrategy initializing with AuthService:',
          authService ? 'Injected' : 'Undefined',
        );
        return new BasicStrategy(authService);
      },
      inject: [AuthService],
    },
  ],
  exports: [AuthService, UsersService],
})
export class AuthModule {
  constructor() {
    Logger.log('AuthModule initialized');
  }
}
