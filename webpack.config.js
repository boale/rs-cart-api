const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const slsw = require('serverless-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = (async options => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    '@nestjs/microservices',
    'cache-manager',
    'class-validator',
    'class-transformer',
    'pg',
    'pg-native',
  ];

  // const entities = {
  //   'src/database/entities/cart-items.entity':
  //     './src/database/entities/cart-items.entity.ts',
  //   'src/database/entities/carts.entity':
  //     './src/database/entities/carts.entity.ts',
  //   'src/database/entities/orders.entity':
  //     './src/database/entities/orders.entity.ts',
  // };

  return {
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    entry: slsw.lib.entries,
    output: {
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, '.webpack'),
      filename: '[name].js',
      clean: true,
    },

    plugins: [
      ...(options?.plugins || []),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],

    target: 'node',
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],

          exclude: [
            [
              path.resolve(__dirname, 'node_modules'),
              path.resolve(__dirname, '.serverless'),
              path.resolve(__dirname, '.webpack'),
            ],
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
  };
})();
