import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisConnectionService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly _configService: ConfigService) {}
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      // password: this._configService.get<string>('redis.redis_password'), //since it is default
      socket: {
        host: this._configService.get<string>('redis.redis_host'),
        port: Number(this._configService.get<number>('redis.redis_port')),
        reconnectStrategy: (retries) => this.reconnectStrategy(retries),
      },
    });

    this.client.on('error', (err) => {
      console.log('THis is Error: ', err);
    });

    this.client.on('connect', () => {
      console.log('Redis is connected successfully');
    });

    await this.client.connect();
    return this.client;
  }

  private reconnectStrategy(retries: number): number | Error {
    if (retries > 50) {
      throw new Error('Redis limit retry connection');
    } else if (retries > 25) {
      return 30000;
    } else if (retries > 10) {
      return 15000;
    }
    return 1000;
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }
}
