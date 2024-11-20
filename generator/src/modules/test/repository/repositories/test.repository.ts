import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common/database/base/repositories/base.repository';
import { TestEntity } from '../entities/test.entity';

@Injectable()
export class TestRepository extends BaseRepository<TestEntity> {
  constructor(
    @InjectRepository(TestEntity)
    private repository: Repository<TestEntity>,
  ) {
    super(repository);
  }

  getRepo(): Repository<TestEntity> {
    return this.repository;
  }
}
