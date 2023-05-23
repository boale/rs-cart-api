import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import helmet from 'helmet';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  app.enableCors({
    origin: (req, callback) => {
      console.log('request', req);
      return callback(null, true);
    },
  });
  app.use(helmet());

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp })
}

bootstrap().then(() => console.log('app started'));

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('lambda is called');
  server = server ?? (await bootstrap());
  console.log('lambda is called');
  return server(event, context, callback);
};
