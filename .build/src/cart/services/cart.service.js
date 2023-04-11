"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../../db/index");
const index_2 = require("../models/index");
const uuid_1 = require("uuid");
let CartService = class CartService {
    async findByUserId(userId) {
        var _a, _b, _c, _d;
        try {
            const selectCartsById = 'SELECT * FROM carts WHERE user_id=$1';
            const values = [userId];
            const cartOfUser = await index_1.poolQuery(selectCartsById, values);
            if (!cartOfUser || cartOfUser.rowCount < 1) {
                return null;
            }
            const selectCartItems = 'SELECT * FROM cart_items WHERE cart_id=$1';
            const cartItems = await index_1.poolQuery(selectCartItems, [(_a = cartOfUser === null || cartOfUser === void 0 ? void 0 : cartOfUser.rows) === null || _a === void 0 ? void 0 : _a[0].id]);
            const response = {
                id: (_b = cartOfUser === null || cartOfUser === void 0 ? void 0 : cartOfUser.rows[0]) === null || _b === void 0 ? void 0 : _b.id,
                items: (((_c = cartItems === null || cartItems === void 0 ? void 0 : cartItems.rows) === null || _c === void 0 ? void 0 : _c.length) > 0) ? cartItems.rows.map(cartItem => ({
                    product: cartItem,
                    count: cartItem.count,
                })) : [],
                status: (_d = cartOfUser === null || cartOfUser === void 0 ? void 0 : cartOfUser.rows[0]) === null || _d === void 0 ? void 0 : _d.status
            };
            return response;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async createByUserId(userId) {
        var _a;
        try {
            const insertCart = `
      INSERT INTO carts (user_id, id, created_at, updated_at, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [userId, uuid_1.v4(uuid_1.v4()), new Date(), new Date(), index_2.Status.OPEN];
            const newCart = await index_1.poolQuery(insertCart, values);
            console.log('newCart', newCart);
            const response = {
                id: (_a = newCart === null || newCart === void 0 ? void 0 : newCart.rows[0]) === null || _a === void 0 ? void 0 : _a.id,
                items: [],
                status: newCart === null || newCart === void 0 ? void 0 : newCart.rows[0].status
            };
            return response;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async findOrCreateByUserId(userId) {
        const userCart = await this.findByUserId(userId);
        if (userCart) {
            return userCart;
        }
        return await this.createByUserId(userId);
    }
    async updateByUserId(userId, items) {
        var _a;
        try {
            const { id, status } = await this.findOrCreateByUserId(userId);
            for (const item of items) {
                const values = [id, item.product.id, item.count];
                const updateCart = `INSERT INTO cart_items (cart_id, product_id, count) VALUES ($1, $2, $3) RETURNING *`;
                await index_1.poolQuery(updateCart, values);
            }
            const updatedCart = await index_1.poolQuery('SELECT * FROM cart_items WHERE cart_id=$1', [id]);
            if (updatedCart.rowCount < 0) {
                return null;
            }
            const response = {
                id: id,
                items: (((_a = updatedCart === null || updatedCart === void 0 ? void 0 : updatedCart.rows) === null || _a === void 0 ? void 0 : _a.length) > 0) ? updatedCart.rows.map(cartItem => ({
                    product: cartItem,
                    count: cartItem.count
                })) : [],
                status: status
            };
            return response;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async removeByUserId(userId) {
        try {
            await index_1.poolQuery('BEGIN', []);
            const { id } = await this.findOrCreateByUserId(userId);
            await index_1.poolQuery('DELETE FROM cart_items WHERE cart_id=$1', [id]);
            await index_1.poolQuery('DELETE FROM carts WHERE user_id=$1', [userId]);
            await index_1.poolQuery('COMMIT', []);
        }
        catch (error) {
            await index_1.poolQuery('ROLLBACK', []);
            return error;
        }
    }
};
CartService = __decorate([
    common_1.Injectable()
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map