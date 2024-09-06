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
    find: IFindOneOptions,
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
}
