import redisConfig from '../cache/redis/config/redis.config';
import dbConfig from '../database/postgres/connection/config/connection.config';

export const configs = [dbConfig, redisConfig];
