import { AuthService } from '../auth.service';
declare const BasicStrategy_base: new (...args: any[]) => any;
export declare class BasicStrategy extends BasicStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, pass: string): Promise<any>;
}
export {};
