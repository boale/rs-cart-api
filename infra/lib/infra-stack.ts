import * as cdk from 'aws-cdk-lib';
import * as gateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ID = 'backend-cart';

    const cartLambda = new NodejsFunction(this, `${ID}-lambda`, {
      runtime: Runtime.NODEJS_20_X,
      handler: 'index.handler',
      entry: path.join(__dirname, '../../dist/index.js'),
      depsLockFilePath: path.join(__dirname, '../../package-lock.json'),
      bundling: {
        forceDockerBundling: true,
        nodeModules: [
          '@nestjs/core',
          '@nestjs/typeorm',
          'typeorm',
          'pg',
          '@nestjs/jwt',
          '@nestjs/passport',
          'passport-http',
        ],
        sourceMap: true,
      },
      environment: {
        DB_HOST: process.env.DB_HOST || '',
        DB_PORT: process.env.DB_PORT || '5432',
        DB_USERNAME: process.env.DB_USERNAME || 'default',
        DB_PASSWORD: process.env.DB_PASSWORD || 'default',
        DB_NAME: process.env.DB_NAME || 'default',
      },
      timeout: cdk.Duration.seconds(60),
      memorySize: 512,
    });

    const myGateway = new gateway.RestApi(this, 'Cart', {
      restApiName: 'Cart Service',
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: [
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'Content-Type',
          'Accept',
        ],
        allowCredentials: true,
      },
    });

    const proxyResource = myGateway.root.addResource('{proxy+}');
    proxyResource.addMethod('ANY', new gateway.LambdaIntegration(cartLambda));

    new cdk.CfnOutput(this, `${ID}-lambda-output`, {
      value: cartLambda.addFunctionUrl({
        authType: cdk.aws_lambda.FunctionUrlAuthType.NONE,
      }).url,
    });

    new cdk.CfnOutput(this, `${ID}-gateway`, {
      value: myGateway.url,
    });
  }
}
