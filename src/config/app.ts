type Config = {
  app: {
    name: string;
    version: string;
    env: string;
    port: number;
    host: string;
  };
};
export function appConfig(): Config {
  return {
    app: {
      env: process.env.NODE_ENV || 'development',
      name: process.env.APP_NAME || 'NestJS Fastify API',
      version: process.env.APP_VERSION || '1.0.0',
      port: parseInt(process.env.PORT || '3000', 10),
      host: process.env.APP_HOST || 'localhost',
    },
  };
}
