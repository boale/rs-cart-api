const handlerPath = (context: string) => {
  return `${context
    .split(process.cwd())[1]
    .substring(1)
    .replace(/\\/g, '/')}`;
};

export default {
  handler: `${handlerPath(__dirname)}/main.cartRoot`,
  events: [
    {
      http: {
        method: 'ANY',
        path: '/',
        cors: true,
      },
    },
    {
      http: {
        method: 'ANY',
        path: '{proxy+}',
        cors: true,
      },
    },
  ],
};
