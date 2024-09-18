import { Controller } from '@nestjs/common';
import { AuthAdminService } from 'src/common/request/auth/services/request.auth.admin.service';

@Controller({
  path: 'auth',
  version: '1.0',
})
export class AuthAdminController {
  constructor(private readonly _authAdminService: AuthAdminService) {}
}
