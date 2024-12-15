import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/database/base/repositories/base.repository';
import { BlogEntity } from '../entities/blogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlogRepository extends BaseRepository<BlogEntity> {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly _blogRepo: Repository<BlogEntity>,
  ) {
    super(_blogRepo);
  }
}
