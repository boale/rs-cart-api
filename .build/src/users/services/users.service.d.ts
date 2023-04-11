import { User } from '../models';
export declare class UsersService {
    private readonly users;
    constructor();
    findOne(userId: string): User;
    createOne({ name, password }: User): User;
}
