import {
  DynamicModule,
  ForwardReference,
  Module,
  Provider,
  Type,
} from '@nestjs/common';
import { ICache } from './interfaces/cache.interface';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { RedisConnectionService } from './redis/services/redis.connection.service';

@Module({})
export class CacheModule {
  public static forRoot(cacheOptions: ICache): DynamicModule {
    const providers: Provider<any>[] = [];
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference<any>
    )[] = [];

    imports.push(ConfigModule);
    if (cacheOptions.redis) {
      imports.push(RedisModule);
      providers.push(RedisConnectionService);
    }

    return {
      module: CacheModule,
      providers: [...providers],
      exports: [...providers],
      controllers: [],
      imports: [...imports],
    };
  }
}
