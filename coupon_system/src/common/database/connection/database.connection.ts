import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConnection implements TypeOrmOptionsFactory {
  constructor(private readonly _configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this._configService.get<string>('data_base_host'),
      port: this._configService.get<number>('data_base_port'),
      username: this._configService.get<string>('data_base_userName'),
      password: this._configService.get<string>('data_base_password'),
      database: this._configService.get<string>('data_base_name'),
      entities: [__dirname + '../../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '../migrations/*{.ts,.js}'],
    };
  }
}
