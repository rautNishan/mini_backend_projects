import { Module } from '@nestjs/common';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserController],
})
export class UserRouterModule {}
