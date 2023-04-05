import {
    Controller,
        Get,
        Delete,
        Put,
        Body,
        Req,
        Post,
        HttpStatus,
} from '@nestjs/common';

import { AppRequest } from '../shared';

import { OrderService } from './services';


@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get('order/:id')
    async getOrderById(@Req() req: AppRequest) {
        try {
            const orders = await this.orderService.getOrder(req.params.id);

            const order = orders.rows[0];
            return {
                statusCode: HttpStatus.OK,
                message: 'OK',
                data: {
                    id: order.id,
                    cart_id: order.cart_id,
                    address: {
                        firstName: order.delivery.firstName,
                        lastName: order.delivery.lastName,
                        address: order.delivery.address,
                        comment:order.comment,
                    },
                    items: order.items,
                    statusHistory: [{
                        status: order.status,
                        timestamp: 1,
                        comment: 'lalala'
                    }],
                },
            };
        } catch (err) {
            console.log('Error on controller getOrderById: ', err)
            return {
                err
            }
        }
    }

    @Get(':userId')
    async getOrders(@Req() req: AppRequest) {
        try {
            const orders = await this.orderService.getOrders(req.params.userId);

            return {
                statusCode: HttpStatus.OK,
                message: 'OK',
                data: orders.map((order) => {
                    return {
                        id: order.id,
                        cart_id: order.cart_id,
                        address: {
                            firstName: order.delivery.firstName,
                            lastName: order.delivery.lastName,
                            address: order.delivery.address,
                            comment:order.comment,
                        },
                        items: order.items,
                        statusHistory: [{
                            status: order.status,
                            timestamp: 1,
                            comment: 'lalala'
                        }],
                    }
                })
            };
        } catch (err) {
            console.log('Error on controller getOrders: ', err)
            return {
                err
            }
        }

    }

    @Post(':userId')
    async submitOrder(@Req() req: AppRequest, @Body() body) {
        try {
            const order = {
                user_id: req.params.userId,
                cart_id: body.cart_id,
                payment: { pay: '0' },
                delivery: { ...body.address },
                comments: body.address.comment,
                status: 'ORDERED',
                total: 0,
                items: JSON.stringify(body.items),
            };

            const createdOrder = await this.orderService.createOrder(order);

            return {
                statusCode: HttpStatus.OK,
                message: 'OK',
                data: {
                    order: createdOrder,
                },
            };
        } catch (err) {
            console.log('Error on controller submitOrder: ', err)
            return {
                err
            }
        }
    }

    @Put('order/:id/status')
    async updateOrder(@Req() req, @Body() body) {
        try {
            await this.orderService.updateOrderStatus(req.params.id, body)
            return {
                statusCode: HttpStatus.OK,
                message: 'OK',
            };
        } catch (err) {
            console.log('Error on controller updateOrder: ', err)
            return {
                err
            }
        }
    }

    @Delete('delete/:id')
    async deleteOrder(@Req() req: AppRequest) {
        try {
            await this.orderService.removeOrder(req.params.id);
            return {
                statusCode: HttpStatus.OK,
                message: 'OK',
            };
        } catch (err) {
            console.log('Error on controller deleteOrder: ', err)
            return {
                err
            }
        }
    }
};
