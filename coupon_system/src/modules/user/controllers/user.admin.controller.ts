import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from 'src/common/docs/decorators/doc.decorator';
import { UserCreateDto } from 'src/common/request/auth/dtos/user.create.dto';
import { RequestParamGuard } from 'src/common/request/decorators/request.param.decorator';
import { UserProtected } from 'src/common/request/decorators/request.user-protected.decorator';
import { RequestIdDto } from 'src/common/request/query/request.param.id.dto';
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
  @ApiDoc({
    operation: 'Get User by Id',
  })
  @UserProtected()
  @RequestParamGuard(RequestIdDto)
  async getById(@Param('id') id: number) {
    return await this._userService.findOneByIdOrFail(id, {
      findOneOptions: {
        select: ['id', 'fullName', 'contactNumber'],
      },
    });
  }
}
