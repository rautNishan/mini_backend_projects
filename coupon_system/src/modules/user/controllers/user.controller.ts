import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiDoc } from 'src/common/docs/decorators/doc.decorator';
import { UserCreateDto } from '../dtos/user.create.dto';

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

  @ApiDoc({
    operation: 'Create new User',
    jwtAccessToken: false,
  })
  @Post('/create')
  async create(@Body() createData: UserCreateDto) {
    console.log('This is createData: ', createData);
  }
}
