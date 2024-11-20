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
import { TestEntity } from '../repository/entities/test.entity';
import { TestRepository } from '../repository/repositories/test.repository';
import { TestCreateDto } from '../dtos/test.create.dto';

@Injectable()
export class TestService {
  constructor(private readonly repository: TestRepository) {}

  async create(
    createDto: TestCreateDto,
    options?: ICreateOptions,
  ): Promise<TestEntity> {
    const existingTest = await this.getOne({
      options: {
        where: {
          name: ILike(`${createDto.name}`), //For case-insensitive
        },
      },
    });

    if (existingTest) {
      throw new BadRequestException('Test already exists');
    }
    const data = await this.repository._create(createDto, options);
    return data;
  }

  async getById(
    id: number,
    options?: IFindOneOptions<TestEntity>,
  ): Promise<TestEntity | null> {
    const data = await this.repository._findOneById(id, options);
    return data;
  }

  async getOne(
    options: IFindOneOptions<TestEntity>,
  ): Promise<TestEntity | null> {
    const data = await this.repository._findOne(options);
    return data;
  }

  async getOneOrFail(
    options: IFindOneOptions<TestEntity>,
  ): Promise<TestEntity> {
    const data = await this.getOne(options);
    if (!data) {
      throw new NotFoundException('Cannot find Test');
    }
    return data;
  }

  async getAll(
    options?: IFindAllOptions<TestEntity>,
  ): Promise<TestEntity[]> {
    return await this.repository._findAll(options);
  }

  getQueryBuilder(
    name: string
  ): SelectQueryBuilder<TestEntity> {
    return this.repository.getRepo().createQueryBuilder(name);
  }

  async paginatedGet(options?: IPaginateFindOption<TestEntity>): Promise<{
    data: TestEntity[];
    _pagination: IPaginationMeta;
  }> {
    return await this.repository._paginateFind(options);
  }

  async paginatedQueryBuilderFind(
    options: IPaginateQueryBuilderOption,
  ): Promise<{
    data: TestEntity[];
    _pagination: IPaginationMeta;
  }> {
    return await this.repository._paginatedQueryBuilder(options);
  }

  async softDelete(
    repository: TestEntity,
    options?: IUpdateOptions<TestEntity>,
  ): Promise<TestEntity> {
    return await this.repository._softDelete(repository, options);
  }

  async delete(
    repository: TestEntity,
    options?: IDeleteOptions<TestEntity>,
  ): Promise<TestEntity> {
    return await this.repository._delete(repository, options);
  }

  async restore(
    options: IUpdateRawOptions<TestEntity>,
  ): Promise<UpdateResult | null> {
    return await this.repository._restoreRaw(options);
  }

  async update(
    repository: TestEntity,
    updateData: DeepPartial<TestEntity>,
    options?: IUpdateOptions<TestEntity>,
  ) {
    if (updateData.name) {
      const existingTest = await this.getOne({
        options: {
          where: {
            name: ILike(`${updateData.name}`),
            id: Not(repository.id),
          },
        },
      });
      if (existingTest) {
        throw new BadRequestException('Test with that same name exists');
      }
      Object.assign(repository, updateData);
    }
    return await this.repository._update(repository, options);
  }
}
