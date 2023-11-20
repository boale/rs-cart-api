import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';

import { Callback, Context, Handler } from 'aws-lambda';
import helmet from 'helmet';
import path from 'path';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

dotenv.config({ path: path.join(__dirname, './../.env') });

const port = process.env.PORT || 4000;

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  app.enableCors({
    origin: (_req, callback) => callback(null, true),
  });
  app.use(helmet());

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

bootstrap().then(() => {
  console.log('App is running on %s port', port);
});

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

