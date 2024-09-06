import {
  IEntityManager,
  IFindOneOptions,
} from 'src/common/database/base/repository/interfaces/base.repository.interface';
import { UserEntity } from '../enitity/user.entity';
import { DeepPartial } from 'typeorm';

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
    findOneOptions: IFindOneOptions,
    options?: IEntityManager,
  ): Promise<UserEntity>;
}
