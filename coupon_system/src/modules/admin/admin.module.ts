import { Module } from '@nestjs/common';
import { AdminRepositoryModule } from './repository/admin.repository.module';
import { AbstractAdminService } from './abstract/admin.service.abstract';
import { AdminService } from './services/admin.service';

@Module({
  imports: [AdminRepositoryModule],
  providers: [
    {
      provide: AbstractAdminService,
      useClass: AdminService,
    },
  ],
  exports: [
    {
      provide: AbstractAdminService,
      useClass: AdminService,
    },
  ],
})
export class AdminModule {}
