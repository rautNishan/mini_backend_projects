import { Module } from '@nestjs/common';
import { AuthService } from './services/request.auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthCommonModule {}
