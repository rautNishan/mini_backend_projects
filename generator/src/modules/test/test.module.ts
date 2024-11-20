import { Module } from '@nestjs/common';
import { TestService } from './services/test.service';
import { TestRepositoryModule } from './repository/test.repository.module';


@Module({
  providers: [TestService],
  exports: [TestService],
  imports: [TestRepositoryModule],
})
export class TestModule {}
