"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCartTotal = void 0;
function calculateCartTotal(cart) {
    return cart ? cart.items.reduce((acc, { product: { price }, count }) => {
        return acc += price * count;
    }, 0) : 0;
}
exports.calculateCartTotal = calculateCartTotal;
//# sourceMappingURL=index.js.map