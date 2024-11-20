import {
  Controller,
  Get,
  Post,
  Delete,
  NotFoundException,
  Param,
  Patch,
  Body,
  Query,
  SerializeOptions,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ADMIN_ONLY_GROUP } from 'src/common/database/constant/serialization-group.constant';
import { ApiDocs } from 'src/common/doc/common-docs';
import { PaginateQueryDto } from 'src/common/doc/query/paginateQuery.dto';
import { ResponseMessage } from 'src/common/response/decorators/responseMessage.decorator';
import {
  IResponse,
  IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { NotificationCreateDto } from '../dtos/notification.create.dto';
import { NotificationUpdateDto } from '../dtos/notification.update.dto';
import { NotificationEntity } from '../repository/entities/notification.entity';
import { NotificationService } from '../services/notification.service';
import {
  NotificationPaginationSerialization,
  NotificationSerialization,
} from '../serializations/notification.serialization';
import { UserProtected } from 'src/common/auth/decorators/auth.decorators';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { CustomResponseDecorator } from 'src/common/auth/decorators/custom.response.decorators';
import { FindAllQueryDto } from 'src/common/doc/query/getAllQuery.dto';
import { DataSource, FindOptionsWhere, In } from 'typeorm';

@SerializeOptions({
  groups: ADMIN_ONLY_GROUP,
})
@ApiTags('Notification')
@Controller('notification')
export class NotificationAdminController {
  constructor(
    private readonly notificationService: NotificationService,
    private connection: DataSource,
  ) {}

  @ApiDocs({
    operation: 'Create Notification.',
    serialization: NotificationSerialization,
  })
  @ResponseMessage('Notification created successfully.')
  @Post()
  async create(@Body() body: NotificationCreateDto): Promise<IResponse<any>> {
    try {
      const data: NotificationEntity =
        await this.notificationService.create(body);
      return { data };
    } catch (error) {
      throw error;
    }
  }

  @ApiDocs({
    operation: 'List Notification',
    serialization: NotificationPaginationSerialization,
  })
  @ResponseMessage('Notification list with pagination retrieved successfully.')
  @Get()
  async list(
    @Query() paginateQueryDto: PaginateQueryDto,
  ): Promise<IResponsePaging<NotificationEntity>> {
    const data = await this.notificationService.paginatedGet({
      ...paginateQueryDto,
      searchableColumns: ['name'],
      defaultSearchColumns: ['name'],
      defaultSortColumn: 'name',
      sortableColumns: ['createdAt', 'id', 'name'],
      options: {
        where: {},
      },
    });
    return data;
  }

  @ApiDocs({
    operation: 'List all Notification without pagination',
    serialization: NotificationPaginationSerialization,
  })
  @UserProtected()
  @ResponseMessage('Notification list retrieved successfully.')
  @Get('/all')
  async listAll(
    @Query() findAllQueryDto: FindAllQueryDto,
  ): Promise<IResponse<NotificationEntity[]>> {
    const where: FindOptionsWhere<NotificationEntity> = {};

    if (findAllQueryDto.ids?.length > 0) {
      where.id = In(findAllQueryDto.ids);
    }

    const data = await this.notificationService.getAll({
      options: {
        where,
      },
    });
    return { data };
  }

  @ApiDocs({
    operation: 'Get Notification',
    serialization: NotificationSerialization,
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @UserProtected()
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('Notification retrieved successfully.')
  @Get(':id')
  async getById(
    @Param('id') id: number,
  ): Promise<IResponse<NotificationEntity>> {
    const data = await this.notificationService.getById(id, {
      options: {
        select: {
          id: true,
          name: true,
        },
      },
    });
    if (!data) throw new NotFoundException('Cannot find Notification');
    return { data };
  }

  @ApiDocs({
    operation: 'Restore Notification',
    serialization: NotificationSerialization,
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @UserProtected()
  @CustomResponseDecorator()
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('Notification restored successfully.')
  @Patch(':id/restore')
  async restoreById(
    @Param('id') id: number,
  ): Promise<IResponse<NotificationEntity>> {
    await this.notificationService.restore({ where: { id } });
    const data: NotificationEntity | null =
      await this.notificationService.getById(id);
    if (!data) throw new NotFoundException('Cannot find Notification');
    return { data };
  }

  @ApiDocs({
    operation: 'Update Notification',
    serialization: NotificationSerialization,
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @UserProtected()
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('Notification updated successfully.')
  @Patch(':id')
  async updateById(
    @Param('id') id: number,
    @Body() updateNotificationData: NotificationUpdateDto,
  ): Promise<IResponse<NotificationEntity>> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const found: NotificationEntity | null =
        await this.notificationService.getById(id);
      if (!found) throw new NotFoundException('Cannot find Notification');
      await this.notificationService.update(found, updateNotificationData, {
        entityManager: queryRunner.manager,
      });
      await queryRunner.commitTransaction();
      return await this.getById(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @ApiDocs({
    operation: 'Delete Notification',
    serialization: NotificationSerialization,
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @UserProtected()
  @CustomResponseDecorator()
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('Notification deleted successfully.')
  @Delete(':id/hard')
  async deleteById(
    @Param('id') id: number,
  ): Promise<IResponse<NotificationEntity>> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const found: NotificationEntity | null =
        await this.notificationService.getById(id);
      if (!found) throw new NotFoundException('Cannot find Notification');
      const data = await this.notificationService.delete(found, {
        entityManager: queryRunner.manager,
      });
      await queryRunner.commitTransaction();
      return { data };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      queryRunner.release();
    }
  }

  @ApiDocs({
    operation: 'Soft delete Notification',
    serialization: NotificationSerialization,
    params: [
      {
        type: 'number',
        required: true,
        name: 'id',
      },
    ],
  })
  @UserProtected()
  @CustomResponseDecorator()
  @RequestParamGuard(IdParamDto)
  @ResponseMessage('Notification soft deleted successfully.')
  @Delete('/:id')
  async softDeleteById(
    @Param('id') id: number,
  ): Promise<IResponse<NotificationEntity>> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const found: NotificationEntity | null =
        await this.notificationService.getById(id);
      if (!found) throw new NotFoundException('Cannot find Notification');
      const data = await this.notificationService.softDelete(found, {
        entityManager: queryRunner.manager,
      });
      await queryRunner.commitTransaction();
      return { data };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
