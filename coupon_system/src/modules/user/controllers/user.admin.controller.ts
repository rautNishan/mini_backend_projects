import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from 'src/common/docs/decorators/doc.decorator';

@ApiTags('User')
@Controller({
  path: '/user',
  version: '1.0',
})
export class UserAdminController {
  constructor(private readonly _userService: UserService) {}

  @ApiDoc({})
  @Get('')
  async getUser() {
    return await this._userService.getUser();
  }
}
