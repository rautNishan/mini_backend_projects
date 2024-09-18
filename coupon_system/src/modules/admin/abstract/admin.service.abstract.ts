import {
  IEntityManager,
  IFindOneOptions,
} from 'src/common/database/postgres/base/repository/interfaces/base.repository.interface';
import { DeepPartial } from 'typeorm';
import { AdminEntity } from '../enitity/admin.entity';

export abstract class AbstractAdminService {
  /**
   *
   * @param createData
   *
   * Creates new Admin if there is not
   */
  abstract create(createData: DeepPartial<AdminEntity>): Promise<AdminEntity>;

  /**
   *
   * @param email
   * @param options
   *
   * Find Admin By Email
   */
  abstract findByEmail(
    email: string,
    options?: IEntityManager,
  ): Promise<AdminEntity>;

  abstract findOneUserOrFail(
    findOneOptions: IFindOneOptions<AdminEntity>,
    options?: IEntityManager,
  ): Promise<AdminEntity>;

  abstract findOneByIdOrFail(
    id: number,
    options?: IFindOneOptions<AdminEntity>,
  ): Promise<AdminEntity>;
}
