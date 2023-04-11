"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_serverless_express_1 = require("aws-serverless-express");
const middleware_1 = require("aws-serverless-express/middleware");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const express = require('express');
const binaryMimeTypes = [];
let cachedServer;
async function bootstrapServer() {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        nestApp.use(middleware_1.eventContext());
        await nestApp.init();
        cachedServer = aws_serverless_express_1.createServer(expressApp, undefined, binaryMimeTypes);
    }
    return cachedServer;
}
exports.handler = async (event, context) => {
    cachedServer = await bootstrapServer();
    return aws_serverless_express_1.proxy(cachedServer, event, context, 'PROMISE').promise;
};
//# sourceMappingURL=lambda.js.map