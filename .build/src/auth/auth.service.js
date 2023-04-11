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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/services/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    validateUser(name, password) {
        const user = this.usersService.findOne(name);
        if (user) {
            return user;
        }
        return this.usersService.createOne({ name, password });
    }
    login(user, type) {
        const LOGIN_MAP = {
            jwt: this.loginJWT,
            basic: this.loginBasic,
            default: this.loginJWT,
        };
        const login = LOGIN_MAP[type];
        return login ? login(user) : LOGIN_MAP.default(user);
    }
    loginJWT(user) {
        const payload = { username: user.name, sub: user.id };
        return {
            token_type: 'Bearer',
            access_token: this.jwtService.sign(payload),
        };
    }
    loginBasic(user) {
        console.log(user);
        function encodeUserToken(user) {
            const { id, name, password } = user;
            const buf = Buffer.from([name, password].join(':'), 'utf8');
            return buf.toString('base64');
        }
        return {
            token_type: 'Basic',
            access_token: encodeUserToken(user),
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map