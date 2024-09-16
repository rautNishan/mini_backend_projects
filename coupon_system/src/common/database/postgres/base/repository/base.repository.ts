import { Injectable } from '@nestjs/common';
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
  }

  async findOne(
    find: IFindOneOptions<T>,
    options?: IEntityManager,
  ): Promise<T | null> {
    if (options?.entityManager) {
      return await options.entityManager.findOne(
        this._repo.target,
        find.findOneOptions,
      );
    }
    return this._repo.findOne(find.findOneOptions);
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
    }
  }
}
