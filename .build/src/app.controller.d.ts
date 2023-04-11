import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    healthCheck(): any;
    login(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    getProfile(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            user: any;
        };
    }>;
}
