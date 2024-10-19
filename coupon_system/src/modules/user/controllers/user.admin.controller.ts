import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from 'src/common/docs/decorators/doc.decorator';
import { UserCreateDto } from 'src/common/request/auth/dtos/user.create.dto';
import { RequestParamGuard } from 'src/common/request/decorators/request.param.decorator';
import { UserProtected } from 'src/common/request/decorators/request.user-protected.decorator';
import { RequestIdDto } from 'src/common/request/query/request.param.id.dto';
import { AbstractUserService } from '../abstract/user.service.abstract';
import { PaginationQueryDto } from 'src/common/request/query/request.pagination.query';

@ApiTags('User')
@Controller({
  path: '/user',
  version: '1.0',
})
export class UserAdminController {
  constructor(private readonly _userService: AbstractUserService) {}

  @ApiDoc({
    operation: 'Create new User',
    jwtAccessToken: false,
  })
  // @UserProtected()
  @Post('/create')
  async create(@Body() createData: UserCreateDto) {
    return await this._userService.create(createData);
  }

  @ApiDoc({
    operation: 'List Users',
    jwtAccessToken: false,
  })
  @Get('/list')
  async list(@Query() paginationQuery?: PaginationQueryDto) {
    try {
      const find: any = {};
      find.where = {};
      return await this._userService.findAll(paginationQuery, find);
    } catch (error) {
      console.log('This is Error: ', error);
    }
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
