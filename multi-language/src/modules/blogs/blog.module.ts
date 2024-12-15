import { Module } from '@nestjs/common';
import { BlogRepositoryModule } from './repositories/blog.repository.module';
import { BlogService } from './services/blog.service';

@Module({
  imports: [BlogRepositoryModule],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {
  constructor() {}
}
