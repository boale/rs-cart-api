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
import { headers } from '../constants';

import { AppRequest } from '../shared';

import { OrderService } from './services';


@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    // @UseGuards(JwtAuthGuard)
    // @UseGuards(BasicAuthGuard)
    @Get(':userId')
    async getOrders(@Req() req: AppRequest) {
        const orders = await this.orderService.getOrders(req.params.userId);

        return {
            statusCode: HttpStatus.OK,
            headers,
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
    }

    @Get('order/:id')
    async getOrderById(@Req() req: AppRequest) {
        const orders = await this.orderService.findById(req.params.id);

        const order = orders.rows[0];
        return {
            statusCode: HttpStatus.OK,
            headers,
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
    }
    //
    // @UseGuards(JwtAuthGuard)
    // @UseGuards(BasicAuthGuard)
    @Post(':userId')
    async submitOrder(@Req() req: AppRequest, @Body() body) {
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

        const createdOrder = await this.orderService.create(order);

        return {
            statusCode: HttpStatus.OK,
            headers,
            message: 'OK',
            data: {
                order: createdOrder,
            },
        };
    }
    //
    // @Put(':id/status')
    // async updateOrderStatus(@Req() req: AppRequest, @Body() body) {
    //     // TODO: validate body payload...
    //     console.log('updateOrderStatus', body);
    //     return {
    //         statusCode: HttpStatus.OK,
    //         message: 'OK',
    //     };
    // }
    //
    // // @UseGuards(JwtAuthGuard)
    // // @UseGuards(BasicAuthGuard)
    // @Delete(':id')
    // async deleteOrder(@Req() req: AppRequest) {
    //     await this.orderService.deleteOrder(req.params.id);
    //
    //     return {
    //         statusCode: HttpStatus.OK,
    //         message: 'OK',
    //     };
    // }
}
