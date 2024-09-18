import { Body, Controller, Post } from '@nestjs/common';
import { ApiDoc } from 'src/common/docs/decorators/doc.decorator';
import { UserLoginDto } from 'src/common/request/auth/dtos/user.login.dto';
import { AuthAdminService } from 'src/common/request/auth/services/request.auth.admin.service';

@Controller({
  path: 'auth',
  version: '1.0',
})
export class AuthAdminController {
  constructor(private readonly _authAdminService: AuthAdminService) {}

  @ApiDoc({
    operation: 'Admin login',
    jwtAccessToken: false,
  })
  @Post('/login')
  async login(@Body() requestData: UserLoginDto): Promise<string> {
    return await this._authAdminService.login(requestData);
  }
}
