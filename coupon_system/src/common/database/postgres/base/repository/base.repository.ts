import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/request/query/request.pagination.query';
import { DeepPartial, Repository } from 'typeorm';
import { DataBaseBaseEntity } from '../entity/base.entity';
import {
  IBaseRepositoryInterface,
  IEntityManager,
  IFindOneOptions,
  ISaveOptions,
} from './interfaces/base.repository.interface';

@Injectable()
export class BaseRepository<T extends DataBaseBaseEntity>
  implements IBaseRepositoryInterface<T>
{
  constructor(private readonly _repo: Repository<T>) {}

  async create(data: DeepPartial<T>, options?: ISaveOptions): Promise<T> {
    try {
      let newlyCreatedEntity: T;
      if (options?.entityManager) {
        newlyCreatedEntity = options.entityManager.create(
          this._repo.target,
          data,
        );
        return await options.entityManager.save(newlyCreatedEntity);
      }
      newlyCreatedEntity = this._repo.create(data);
      return await this._repo.save(newlyCreatedEntity);
    } catch (error) {
      console.log('Db Error: ', error);

      throw error;
    }
  }

  async findOne(
    find: IFindOneOptions<T>,
    options?: IEntityManager,
  ): Promise<T | null> {
    try {
      if (options?.entityManager) {
        return await options.entityManager.findOne(
          this._repo.target,
          find.findOneOptions,
        );
      }
      return this._repo.findOne(find.findOneOptions);
    } catch (error) {
      console.log('Db Error: ', error);
      throw error;
    }
  }

  async findOneById(id: number, options?: IFindOneOptions<T>) {
    try {
      const where: any = {};
      where['id'] = Number(id);
      if (options?.entityManager) {
        return await options.entityManager.findOne(this._repo.target, {
          where: { ...where },
          ...options.findOneOptions,
        });
      }

      return this._repo.findOne({
        where: { ...where },
        ...options.findOneOptions,
      });
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }

  async findAll<T>(
    paginationQuery?: PaginationQueryDto,
    options?: IFindOneOptions<T>,
  ) {
    try {
      let sortBy: keyof T | string = 'createdAt';
      let sortOrder = 'DESC';
      let defaultLimit = 10; //todo enum
      let defaultSkip = 1;

      //10
      //20
      //30 (10)

      if (paginationQuery) {
        sortBy = paginationQuery.sortBy ? paginationQuery.sortBy : sortBy;
        sortOrder = paginationQuery.sortOrder
          ? paginationQuery.sortOrder
          : sortOrder;
        defaultLimit = paginationQuery?.limit;
        defaultSkip = paginationQuery?.page;
      }
      const find: any = {};

      find.order = {
        [sortBy]: sortOrder ?? 'DESC',
      };

      if (options.findOneOptions.select) {
        find.select = options.findOneOptions.select;
      }

      find.take = Number(defaultLimit);
      find.skip = defaultSkip * defaultLimit - defaultLimit;

      console.log('🚀 ~ find:', find);

      return await this._repo.find(find);
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }
}
