import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  IEntityManager,
  IFindOneOptions,
} from 'src/common/database/postgres/base/repository/interfaces/base.repository.interface';
import { DeepPartial } from 'typeorm';
import { AbstractAdminService } from '../abstract/admin.service.abstract';
import { AdminEntity } from '../enitity/admin.entity';
import { AdminRepository } from '../repository/admin.repository';

@Injectable()
export class AdminService extends AbstractAdminService {
  constructor(private readonly _adminRepo: AdminRepository) {
    super();
  }

  async create(createData: DeepPartial<AdminEntity>, options?: IEntityManager) {
    const existingUser: AdminEntity | null = await this.findOneOrNull(
      {
        findOneOptions: {
          where: { email: createData.email },
        },
      },
      options,
    );

    if (existingUser) {
      throw new HttpException(
        'User already exists with that email',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this._adminRepo.create(createData);
  }

  async findOneOrNull(
    findOneOptions: IFindOneOptions<AdminEntity>,
    options?: IEntityManager,
  ): Promise<AdminEntity | null> {
    return await this._adminRepo.findOne(findOneOptions, options);
  }

  async findByEmail(
    email: string,
    options?: IEntityManager,
  ): Promise<AdminEntity> {
    return await this.findOneUserOrFail(
      {
        findOneOptions: { where: { email: email } },
      },
      options,
    );
  }

  async findOneUserOrFail(
    findOneOptions: IFindOneOptions<AdminEntity>,
    options?: IEntityManager,
  ): Promise<AdminEntity> {
    const existingUser: AdminEntity = await this._adminRepo.findOne(
      findOneOptions,
      options,
    );
    if (!existingUser) {
      throw new HttpException('Invalid user', HttpStatus.NOT_FOUND);
    }
    return existingUser;
  }

  async findOneByIdOrFail(
    id: number,
    options?: IFindOneOptions<AdminEntity>,
  ): Promise<AdminEntity> {
    const existingUser = await this._adminRepo.findOneById(id, options);
    if (!existingUser) {
      throw new HttpException('Invalid user', HttpStatus.NOT_FOUND);
    }
    return existingUser;
  }
}
