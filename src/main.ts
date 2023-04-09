import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

import { AppModule } from './app.module';

let server: Handler | void;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());

  return server && server(event, context, callback);
};