import {
  IEntityManager,
  IFindOneOptions,
} from 'src/common/database/postgres/base/repository/interfaces/base.repository.interface';
import { UserEntity } from '../enitity/user.entity';
import { DeepPartial } from 'typeorm';
import { PaginationQueryDto } from 'src/common/request/query/request.pagination.query';

export abstract class AbstractUserService {
  /**
   *
   * @param createData
   *
   * Creates new User if there is not
   */
  abstract create(createData: DeepPartial<UserEntity>): Promise<UserEntity>;

  /**
   *
   * @param email
   * @param options
   *
   * Find Users By Email
   */
  abstract findByEmail(
    email: string,
    options?: IEntityManager,
  ): Promise<UserEntity>;

  abstract findOneUserOrFail(
    findOneOptions: IFindOneOptions<UserEntity>,
    options?: IEntityManager,
  ): Promise<UserEntity>;

  abstract findOneByIdOrFail(
    id: number,
    options?: IFindOneOptions<UserEntity>,
  ): Promise<UserEntity>;

  abstract findAll<T>(
    paginationQuery?: PaginationQueryDto,
    options?: IFindOneOptions<T>,
  ): Promise<UserEntity[]>;
}
