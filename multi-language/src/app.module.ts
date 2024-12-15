import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { RedisModule } from './common/redis/redis.module';
import { BlogModule } from './modules/blogs/blog.module';
import { BlogController } from './modules/blogs/controllers/blogs.controller';

@Module({
  imports: [RedisModule, DatabaseModule, BlogModule],
  controllers: [BlogController],
  providers: [],
})
export class AppModule {
  constructor() {}
}
