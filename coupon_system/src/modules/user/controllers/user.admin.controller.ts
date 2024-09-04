import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from 'src/common/docs/decorators/doc.decorator';
import { UserCreateDto } from 'src/common/request/auth/dtos/user.create.dto';
import { UserService } from '../services/user.service';

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

  @ApiDoc({
    operation: 'Create new User',
  })
  // @UserProtected()
  @Post('/create')
  async create(@Body() createData: UserCreateDto) {
    console.log('This is createData: ', createData);
  }
}
