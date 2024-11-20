import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from './entities/test.entity';
import { TestRepository } from './repositories/test.repository';

@Module({
  providers: [TestRepository],
  exports: [TestRepository],
  controllers: [],
  imports: [TypeOrmModule.forFeature([TestEntity])],
})
export class TestRepositoryModule {}
