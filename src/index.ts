import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Logger } from '@nestjs/common';
import * as express from 'express';
import * as cors from 'cors';

let cachedServer;

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const expressApp = express();
  logger.log('Creating Nest application...');
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.use(cors());
  // Log headers for debugging
  expressApp.use((req, res, next) => {
    logger.log('Express Headers:', JSON.stringify(req.headers, null, 2));
    next();
  });

  app.enableCors({
    origin: '*',
    methods: 'OPTIONS, GET, POST, DELETE, PUT',
    allowedHeaders: 'Authorization, Content-Type',
  });
  logger.log('Initializing Nest application...');
  await app.init();
  logger.log('Nest application initialized');
  return serverlessExpress({ app: expressApp });
}

export const handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(event, context);
};
