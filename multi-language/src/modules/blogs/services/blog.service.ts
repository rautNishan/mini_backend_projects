import { Injectable, NotFoundException } from '@nestjs/common';
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
import { UpdateResult } from 'typeorm';
import { BlogEntity } from '../entities/blogs.entity';
import { BlogRepository } from '../repositories/blogs.repository';

@Injectable()
export class BlogService {
  constructor(private readonly _blogRepo: BlogRepository) {}

  async create(createDto: any, options?: any): Promise<BlogEntity> {
    if (createDto.primaryLanguage) {
      console.log('This is primay language: ', createDto.primaryLanguage);
    }
    return await this._blogRepo._create(createDto, options);
  }

  async getById(
    id: number,
    options?: IFindOneOptions<BlogEntity>,
  ): Promise<BlogEntity | null> {
    const data = await this._blogRepo._findOneById(id, options);
    return data;
  }

  async getOne(
    options: IFindOneOptions<BlogEntity>,
  ): Promise<BlogEntity | null> {
    const data = await this._blogRepo._findOne(options);
    return data;
  }

  async getOneOrFail(
    options: IFindOneOptions<BlogEntity>,
  ): Promise<BlogEntity> {
    const data = await this.getOne(options);
    if (!data) {
      throw new NotFoundException('Cannot find Blog');
    }
    return data;
  }

  async getAll(options?: IFindAllOptions<BlogEntity>): Promise<BlogEntity[]> {
    return await this._blogRepo._findAll(options);
  }

  async paginatedGet(options?: IPaginateFindOption<BlogEntity>): Promise<{
    data: BlogEntity[];
    _pagination: IPaginationMeta;
  }> {
    return await this._blogRepo._paginateFind(options);
  }

  async paginatedQueryBuilderFind(
    options: IPaginateQueryBuilderOption,
  ): Promise<{
    data: BlogEntity[];
    _pagination: IPaginationMeta;
  }> {
    return await this._blogRepo._paginatedQueryBuilder(options);
  }

  async softDelete(
    _blogRepo: BlogEntity,
    options?: IUpdateOptions<BlogEntity>,
  ): Promise<BlogEntity> {
    return await this._blogRepo._softDelete(_blogRepo, options);
  }

  async delete(
    _blogRepo: BlogEntity,
    options?: IDeleteOptions<BlogEntity>,
  ): Promise<BlogEntity> {
    return await this._blogRepo._delete(_blogRepo, options);
  }

  async restore(
    options: IUpdateRawOptions<BlogEntity>,
  ): Promise<UpdateResult | null> {
    return await this._blogRepo._restoreRaw(options);
  }

  async update(
    _blogRepo: BlogEntity,
    updateData: any,
    options?: IUpdateOptions<BlogEntity>,
  ) {
    Object.assign(_blogRepo, updateData);
    return await this._blogRepo._update(_blogRepo, options);
  }
}
