import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from '../entities/blogs.entity';
import { BlogRepository } from './blogs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  providers: [BlogRepository],
  exports: [BlogRepository],
})
export class BlogRepositoryModule {}
