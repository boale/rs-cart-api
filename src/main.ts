import { AppModule } from './app.module';

import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';

let server: Handler;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require("helmet");

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

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
  return server(event, context, callback);
};
