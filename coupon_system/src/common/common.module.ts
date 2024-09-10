import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ResponseModule } from './response/response.module';
import { ErrorModule } from './errors/error.module';

@Module({ imports: [DatabaseModule, ResponseModule, ErrorModule] })
export class CommonModule {}
