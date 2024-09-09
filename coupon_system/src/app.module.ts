import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { configs } from './common/configs/config';
import { CustomRouterModule } from './router/router.module';

@Module({
  imports: [
    CustomRouterModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: configs,
    }),
    CommonModule,
  ],
})
export class AppModule {
  constructor() {}
}
