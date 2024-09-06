import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from './services/request.auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthCommonModule {}
