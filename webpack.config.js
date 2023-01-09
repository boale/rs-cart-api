import { CleanWebpackPlugin } from 'clean-webpack-plugin';
module.exports = (options, webpack) => {
  const WebPackIgnorePlugin =
    {
      checkResource: function(resource)
      {
        const lazyImports =
          [
            '@nestjs/microservices',
            '@nestjs/microservices/microservices-module',
            '@nestjs/websockets/socket-module',
            'cache-manager',
            'class-transformer',
            'class-validator',
            'fastify-static',
          ];

        if (!lazyImports.includes(resource))
          return false;

        try
        {
          require.resolve(resource);
        }
        catch (err)
        {
          return true;
        }

        return false;
      }
    };
  return {
    ...options,
    plugins: [
      ...options.plugins,
      new CleanWebpackPlugin(),
      new webpack.IgnorePlugin(WebPackIgnorePlugin),
    ],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    }
  };
};
