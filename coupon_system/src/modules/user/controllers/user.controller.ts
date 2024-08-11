import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller({
  path: '/user',
  version: '1.0',
})
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Get('')
  async getUser() {
    return await this._userService.getUser();
  }
}
