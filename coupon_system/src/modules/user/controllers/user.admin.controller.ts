import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from 'src/common/docs/decorators/doc.decorator';
import { UserCreateDto } from '../dtos/user.create.dto';

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
  @Post('/create')
  async create(@Body() createData: UserCreateDto) {
    console.log('This is createData: ', createData);
  }
}
