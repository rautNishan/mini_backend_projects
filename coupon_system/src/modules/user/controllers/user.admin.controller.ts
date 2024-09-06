import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from 'src/common/docs/decorators/doc.decorator';
import { UserCreateDto } from 'src/common/request/auth/dtos/user.create.dto';
import { UserProtected } from 'src/common/request/decorators/request.user-protected.decorator';
import { AbstractUserService } from '../abstract/user.service.abstract';

@ApiTags('User')
@Controller({
  path: '/user',
  version: '1.0',
})
export class UserAdminController {
  constructor(private readonly _userService: AbstractUserService) {}

  @ApiDoc({
    operation: 'Create new User',
  })
  @UserProtected()
  @Post('/create')
  async create(@Body() createData: UserCreateDto) {
    return await this._userService.create(createData);
  }

  @Get('/:id')
  // @UserProtected()
  //todo make ParamGuard
  getById(@Param('id') id: number) {
    console.log('This is Id: ', id);
    console.log('Type of id: ', typeof id);
  }
}
