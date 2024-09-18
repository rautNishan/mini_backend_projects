import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';

import { ConfigModule } from '@nestjs/config';
import { AuthAdminService } from './services/request.auth.admin.service';
import { AuthUserService } from './services/request.auth.user.service';
import { AdminModule } from 'src/modules/admin/admin.module';

@Module({
  providers: [AuthAdminService, AuthUserService],
  exports: [AuthAdminService, AuthUserService],
  imports: [
    UserModule,
    AdminModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule,
  ],
})
export class AuthCommonModule {}
