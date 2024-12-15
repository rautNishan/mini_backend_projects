import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    try {
      console.log('This is in database service');
      const data = {
        type: this.configService.get('database.type', { infer: true }),
        url: this.configService.get('database.url', { infer: true }),
        host: this.configService.get('database.host', { infer: true }),
        port: this.configService.get('database.port', { infer: true }),
        username: this.configService.get('database.username', { infer: true }),
        password: this.configService.get('database.password', { infer: true }),
        database: this.configService.get('database.name', { infer: true }),
        synchronize: this.configService.get('database.synchronize', {
          infer: true,
        }),
        cache: {
          type: 'redis',
          options: {
            password: this.configService.get<string>('database.redis.password'),
            socket: {
              host: this.configService.get<string>('database.redis.host'),
              port: Number(
                this.configService.get<number>('database.redis.port'),
              ),
              reconnectStrategy: (retries) => {
                if (retries > 50) {
                  throw new Error('Redis limit retry connection');
                } else if (retries > 25) {
                  return 30 * 1000;
                }
                if (retries > 10) {
                  return 15 * 1000;
                }
                return 10 * 100;
              },
            },
          },
          ignoreErrors: true,
        },
        dropSchema: false,
        keepConnectionAlive: true,
        logging:
          this.configService.get('DATABASE_LOGGING', {
            infer: true,
          }) === 'true',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        cli: {
          entitiesDir: 'src',
          migrationsDir: 'src/database/migrations',
        },
        extra: {
          max: this.configService.get('database.maxConnections', {
            infer: true,
          }),
          ssl: this.configService.get('database.sslEnabled', { infer: true })
            ? {
                rejectUnauthorized: this.configService.get(
                  'database.rejectUnauthorized',
                  { infer: true },
                ),
                ca:
                  this.configService.get('database.ca', { infer: true }) ??
                  undefined,
                key:
                  this.configService.get('database.key', { infer: true }) ??
                  undefined,
                cert:
                  this.configService.get('database.cert', { infer: true }) ??
                  undefined,
              }
            : undefined,
        },
      } as TypeOrmModuleOptions;
      return data;
    } catch (error) {
      console.log('This is error in db: ', error);
    }
  }
}
