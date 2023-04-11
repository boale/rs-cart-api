import { Cart, CartItem } from '../models';
export declare class CartService {
    findByUserId(userId: string): Promise<Cart>;
    createByUserId(userId: string): Promise<Cart>;
    findOrCreateByUserId(userId: string): Promise<Cart>;
    updateByUserId(userId: string, items: CartItem[]): Promise<Cart>;
    removeByUserId(userId: any): Promise<void>;
}
