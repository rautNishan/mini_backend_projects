import { EntityManager } from 'typeorm';

export interface IBaseRepositoryInterface<T> {
  create: (data: any, options: any) => Promise<T>;
}

export interface ISaveOptions {
  entityManager: EntityManager;
}
