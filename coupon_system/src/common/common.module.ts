import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ErrorModule } from './errors/error.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [
    DatabaseModule.forRoot({ postgres: true }),
    ResponseModule,
    ErrorModule,
  ],
})
export class CommonModule {}
