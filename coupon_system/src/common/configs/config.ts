import redisConfig from '../cache/redis/config/redis.config';
import dbConfig from '../database/postgres/connection/config/connection.config';
import authConfig from '../request/auth/config/auth.config';

export const configs = [dbConfig, redisConfig, authConfig];
