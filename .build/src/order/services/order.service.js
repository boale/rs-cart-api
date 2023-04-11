"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let OrderService = class OrderService {
    constructor() {
        this.orders = {};
    }
    findById(orderId) {
        return this.orders[orderId];
    }
    create(data) {
        const id = uuid_1.v4(uuid_1.v4());
        const order = Object.assign(Object.assign({}, data), { id, status: 'inProgress' });
        this.orders[id] = order;
        return order;
    }
    update(orderId, data) {
        const order = this.findById(orderId);
        if (!order) {
            throw new Error('Order does not exist.');
        }
        this.orders[orderId] = Object.assign(Object.assign({}, data), { id: orderId });
    }
};
OrderService = __decorate([
    common_1.Injectable()
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map