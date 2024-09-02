import { Controller } from '@nestjs/common';
import { AuthService } from 'src/common/request/auth/services/request.auth.service';

@Controller({
  path: 'auth',
  version: '1.0',
})
export class AuthAdminController {
  constructor(private readonly _authService: AuthService) {}
}
