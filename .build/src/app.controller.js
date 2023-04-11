"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("./auth");
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    healthCheck() {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
        };
    }
    async login(req) {
        const token = this.authService.login(req.user, 'basic');
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
            data: Object.assign({}, token),
        };
    }
    async getProfile(req) {
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'OK',
            data: {
                user: req.user,
            },
        };
    }
};
__decorate([
    common_1.Get(['', 'ping']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "healthCheck", null);
__decorate([
    common_1.UseGuards(auth_1.LocalAuthGuard),
    common_1.Post('api/auth/login'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    common_1.UseGuards(auth_1.BasicAuthGuard),
    common_1.Get('api/profile'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProfile", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [auth_1.AuthService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map