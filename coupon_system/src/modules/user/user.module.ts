import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepositoryModule } from './repository/user.repository.module';
import { AbstractUserService } from './abstract/user.service.abstract';
@Module({
  imports: [UserRepositoryModule],
  providers: [
    {
      provide: AbstractUserService,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: AbstractUserService,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
