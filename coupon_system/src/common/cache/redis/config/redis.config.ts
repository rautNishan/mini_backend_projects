import { registerAs } from '@nestjs/config';

export default registerAs(
  'redis',
  (): Record<string, any> => ({
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
    redis_password: process.env.REDIS_DB_PASS,
  }),
);
