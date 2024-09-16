import {
  DynamicModule,
  ForwardReference,
  Module,
  Provider,
  Type,
} from '@nestjs/common';
import { IDataBaseOptions } from './interfaces/database.interface';
import { PostgresDatabaseModule } from './postgres/postgres.module';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class DatabaseModule {
  public static forRoot(dataBaseOptions: IDataBaseOptions): DynamicModule {
    const providers: Provider<any>[] = [];
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference<any>
    )[] = [];

    imports.push(ConfigModule);
    if (dataBaseOptions.postgres) {
      imports.push(PostgresDatabaseModule);
    }

    return {
      module: DatabaseModule,
      providers: providers,
      imports: imports,
    };
  }
}
