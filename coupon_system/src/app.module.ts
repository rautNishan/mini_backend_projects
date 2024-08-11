import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configs } from './common/configs/config';
import { DatabaseModule } from './common/database/database.module';
import { CustomRouterModule } from './router/router.module';

@Module({
  imports: [
    CustomRouterModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: configs,
    }),
    DatabaseModule,
  ],
})
export class AppModule {
  constructor() {}
}
