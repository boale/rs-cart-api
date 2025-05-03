// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../../entities/user.entity';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async findOne(email: string): Promise<User> {
//     return await this.userRepository.findOne({ where: { email } });
//   }

//   async createOne({ email, password }: Partial<User>): Promise<User> {
//     const newUser = this.userRepository.create({
//       email,
//       password,
//       created_at: new Date(),
//       updated_at: new Date(),
//     });

//     return this.userRepository.save(newUser);
//   }
// }
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// //import { User } from '../entities/user.entity'; // Adjust path
// import { User } from 'src/entities/user.entity';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {
//     console.log(
//       'UserRepository:',
//       this.userRepository ? 'Initialized' : 'Undefined',
//     );
//   }

//   async findOne(email: string): Promise<User | undefined> {
//     console.log('Finding user:', email);
//     return this.userRepository.findOne({ where: { email } });
//   }

//   async createOne(user: User): Promise<User> {
//     return this.userRepository.save(user);
//   }
// }
// import { Injectable, Logger } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from 'src/entities/user.entity';
// @Injectable()
// export class UsersService {
//   private readonly logger = new Logger(UsersService.name);

//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {
//     this.logger.log(
//       'UserRepository:',
//       this.userRepository ? 'Initialized' : 'Undefined',
//     );
//   }

//   async findOne(email: string): Promise<User | undefined> {
// //     this.logger.log('Finding user:', email);
// //     if (!this.userRepository) {
// //       throw new Error('UserRepository not initialized');
// //     }
// //     return this.userRepository.findOne({ where: { email } });
// //   }

// //   async createOne(user: User): Promise<User> {
// //     return this.userRepository.save(user);
// //   }
// // }

// import { Injectable, Logger } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from 'src/entities/user.entity';

// @Injectable()
// export class UsersService {
//   private readonly logger = new Logger(UsersService.name);

//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {
//     this.logger.log(
//       'UserRepository:',
//       this.userRepository ? 'Initialized' : 'Undefined',
//     );
//   }

//   async findOne(email: string): Promise<User | undefined> {
//     this.logger.log('Finding user:', email);
//     if (!this.userRepository) {
//       throw new Error('UserRepository not initialized');
//     }
//     return this.userRepository.findOne({ where: { email } });
//   }

//   async createOne(user: User): Promise<User> {
//     return this.userRepository.save(user);
//   }
// }
// import { Injectable, Logger } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from 'src/entities/user.entity';

// @Injectable()
// export class UsersService {
//   private readonly logger = new Logger(UsersService.name);

//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {
//     this.logger.log(
//       'UserRepository:',
//       this.userRepository ? 'Initialized' : 'Undefined',
//     );
//   }

//   async findOne(email: string): Promise<User | undefined> {
//     this.logger.log('Finding user:', email);
//     if (!this.userRepository) {
//       throw new Error('UserRepository not initialized');
//     }
//     return this.userRepository.findOne({ where: { email } });
//   }

//   async createOne(user: User): Promise<User> {
//     return this.userRepository.save(user);
//   }
// }
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.logger.log(
      'UserRepository:',
      this.userRepository ? 'Initialized' : 'Undefined',
    );
  }

  async findOne(email: string): Promise<User | undefined> {
    this.logger.log('Finding user:', email);
    return this.userRepository.findOne({ where: { email } });
  }

  async createOne(user: Partial<User>): Promise<User> {
    this.logger.log('Creating user:', user.email);
    return this.userRepository.save(this.userRepository.create(user));
  }
}
