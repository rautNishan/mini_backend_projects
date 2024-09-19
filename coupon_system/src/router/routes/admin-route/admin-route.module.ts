import { Module } from '@nestjs/common';
import { AuthCommonModule } from 'src/common/request/auth/auth.module';
import { AdminModule } from 'src/modules/admin/admin.module';
import { AuthAdminController } from 'src/modules/auth/controller/auth.admin.controller';
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [AdminModule, UserModule, AuthCommonModule],
  controllers: [AuthAdminController, UserAdminController],
})
export class AdminRouteModule {}
