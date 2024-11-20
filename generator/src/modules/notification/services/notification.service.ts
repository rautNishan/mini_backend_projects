import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ICreateOptions } from 'src/common/database/interfaces/createOption.interface';
import { IDeleteOptions } from 'src/common/database/interfaces/deleteOption.interface';
import {
  IFindAllOptions,
  IFindOneOptions,
  IPaginateFindOption,
  IPaginateQueryBuilderOption,
} from 'src/common/database/interfaces/findOption.interface';
import {
  IUpdateOptions,
  IUpdateRawOptions,
} from 'src/common/database/interfaces/updateOption.interface';
import { IPaginationMeta } from 'src/common/response/interfaces/response.interface';
import { DeepPartial, ILike, Not, UpdateResult, SelectQueryBuilder } from 'typeorm';
import { NotificationEntity } from '../repository/entities/notification.entity';
import { NotificationRepository } from '../repository/repositories/notification.repository';
import { NotificationCreateDto } from '../dtos/notification.create.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly repository: NotificationRepository) {}

  async create(
    createDto: NotificationCreateDto,
    options?: ICreateOptions,
  ): Promise<NotificationEntity> {
    const existingNotification = await this.getOne({
      options: {
        where: {
          name: ILike(`${createDto.name}`), //For case-insensitive
        },
      },
    });

    if (existingNotification) {
      throw new BadRequestException('Notification already exists');
    }
    const data = await this.repository._create(createDto, options);
    return data;
  }

  async getById(
    id: number,
    options?: IFindOneOptions<NotificationEntity>,
  ): Promise<NotificationEntity | null> {
    const data = await this.repository._findOneById(id, options);
    return data;
  }

  async getOne(
    options: IFindOneOptions<NotificationEntity>,
  ): Promise<NotificationEntity | null> {
    const data = await this.repository._findOne(options);
    return data;
  }

  async getOneOrFail(
    options: IFindOneOptions<NotificationEntity>,
  ): Promise<NotificationEntity> {
    const data = await this.getOne(options);
    if (!data) {
      throw new NotFoundException('Cannot find Notification');
    }
    return data;
  }

  async getAll(
    options?: IFindAllOptions<NotificationEntity>,
  ): Promise<NotificationEntity[]> {
    return await this.repository._findAll(options);
  }

  getQueryBuilder(
    name: string
  ): SelectQueryBuilder<NotificationEntity> {
    return this.repository.getRepo().createQueryBuilder(name);
  }

  async paginatedGet(options?: IPaginateFindOption<NotificationEntity>): Promise<{
    data: NotificationEntity[];
    _pagination: IPaginationMeta;
  }> {
    return await this.repository._paginateFind(options);
  }

  async paginatedQueryBuilderFind(
    options: IPaginateQueryBuilderOption,
  ): Promise<{
    data: NotificationEntity[];
    _pagination: IPaginationMeta;
  }> {
    return await this.repository._paginatedQueryBuilder(options);
  }

  async softDelete(
    repository: NotificationEntity,
    options?: IUpdateOptions<NotificationEntity>,
  ): Promise<NotificationEntity> {
    return await this.repository._softDelete(repository, options);
  }

  async delete(
    repository: NotificationEntity,
    options?: IDeleteOptions<NotificationEntity>,
  ): Promise<NotificationEntity> {
    return await this.repository._delete(repository, options);
  }

  async restore(
    options: IUpdateRawOptions<NotificationEntity>,
  ): Promise<UpdateResult | null> {
    return await this.repository._restoreRaw(options);
  }

  async update(
    repository: NotificationEntity,
    updateData: DeepPartial<NotificationEntity>,
    options?: IUpdateOptions<NotificationEntity>,
  ) {
    if (updateData.name) {
      const existingNotification = await this.getOne({
        options: {
          where: {
            name: ILike(`${updateData.name}`),
            id: Not(repository.id),
          },
        },
      });
      if (existingNotification) {
        throw new BadRequestException('Notification with that same name exists');
      }
      Object.assign(repository, updateData);
    }
    return await this.repository._update(repository, options);
  }
}
