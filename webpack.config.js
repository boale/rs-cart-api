const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (options, webpack) {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    'class-transformer/storage',
  ];

  return {
    ...options,
    externals: [],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        }),
      ],
    },

    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new CopyWebpackPlugin({
        patterns: [
          './node_modules/swagger-ui-dist/swagger-ui.css',
          './node_modules/swagger-ui-dist/swagger-ui-bundle.js',
          './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
          './node_modules/swagger-ui-dist/favicon-16x16.png',
          './node_modules/swagger-ui-dist/favicon-32x32.png',
        ],
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^aws-sdk$/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^aws-lambda$/,
      }),
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
  };
};
