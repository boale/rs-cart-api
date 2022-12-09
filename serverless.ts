import cars from '@functions/cars';
import { findUserCart } from '@functions/index';

import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'cart-api3',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
         
          {
            Effect: 'Allow',
            Action: 'dynamodb:*',
            Resource: { 'Fn::GetAtt': ['ProductsTable2', 'Arn'] },
          },
          {
            Effect: 'Allow',
            Action: 'dynamodb:*',
            Resource: { 'Fn::GetAtt': ['StocksTable2', 'Arn'] },
          },
        ],
      },
    },
  },
  functions: { cars, findUserCart },
  resources: {
    Resources: {
      
      ProductsTable2: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'products2',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      StocksTable2: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'stocks2',
          AttributeDefinitions: [
            {
              AttributeName: 'product_id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'product_id',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
