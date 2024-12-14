import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [DatabaseModule.forRoot({ postgres: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
