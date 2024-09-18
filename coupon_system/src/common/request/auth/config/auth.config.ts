import { registerAs } from '@nestjs/config';

export default registerAs(
  'auth',
  (): Record<string, any> => ({
    jwt_secret: process.env.JWT_SECRET,
  }),
);
