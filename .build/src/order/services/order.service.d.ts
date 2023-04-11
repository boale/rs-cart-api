import { Order } from '../models';
export declare class OrderService {
    private orders;
    findById(orderId: string): Order;
    create(data: any): any;
    update(orderId: any, data: any): void;
}
