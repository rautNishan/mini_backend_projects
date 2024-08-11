import { Module } from '@nestjs/common';
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserAdminController],
})
export class AdminRouteModule {}
