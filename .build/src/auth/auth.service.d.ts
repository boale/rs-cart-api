import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/models';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(name: string, password: string): any;
    login(user: User, type: any): any;
    loginJWT(user: User): {
        token_type: string;
        access_token: string;
    };
    loginBasic(user: User): {
        token_type: string;
        access_token: string;
    };
}
