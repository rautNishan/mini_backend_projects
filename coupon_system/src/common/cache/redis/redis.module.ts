import { Module } from '@nestjs/common';
import { RedisConnectionService } from './services/redis.connection.service';
import { REDIS_TOKEN } from './constants/redis.constant';
import { RedisKeyValueService } from './services/redis.service';

@Module({
  imports: [],
  providers: [
    {
      provide: REDIS_TOKEN,
      useClass: RedisConnectionService,
    },
    RedisKeyValueService,
  ],
  exports: [
    {
      provide: REDIS_TOKEN,
      useClass: RedisConnectionService,
    },
    RedisKeyValueService,
  ],
})
export class RedisModule {}
