import { EntityManager, FindOneOptions } from 'typeorm';

export interface IBaseRepositoryInterface<T> {
  create(data: any, options: any): Promise<T>;
  findOne(find: IFindOneOptions, options?: IEntityManager): Promise<T | null>;
}

export interface ISaveOptions {
  entityManager: EntityManager;
}

export interface IEntityManager {
  entityManager: EntityManager;
}
export interface IFindOneOptions {
  findOneOptions: FindOneOptions;
}
