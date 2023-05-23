const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const slsWebpack = require('serverless-webpack');

return {
  externals: [],
  mode: "development",
  target: "node",
  entry: './src/main.ts',
  resolve: {
    extensions: ['.ts', '.json', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: [
          [
            path.resolve(__dirname, "node_modules")
          ],
        ],
      },
    ],
  },
};