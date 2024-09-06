import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  IEntityManager,
  IFindOneOptions,
} from 'src/common/database/base/repository/interfaces/base.repository.interface';
import { DeepPartial } from 'typeorm';
import { UserEntity } from '../enitity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { AbstractUserService } from '../abstract/user.service.abstract';

@Injectable()
export class UserService extends AbstractUserService {
  constructor(private readonly _userRepository: UserRepository) {
    super();
  }

  async create(createData: DeepPartial<UserEntity>, options?: IEntityManager) {
    const existingUser: UserEntity | null = await this.findOneOrNull(
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

    return await this._userRepository.create(createData);
  }

  async findOneOrNull(
    findOneOptions: IFindOneOptions,
    options?: IEntityManager,
  ): Promise<UserEntity | null> {
    return await this._userRepository.findOne(findOneOptions, options);
  }

  async findByEmail(
    email: string,
    options?: IEntityManager,
  ): Promise<UserEntity> {
    return await this.findOneUserOrFail(
      {
        findOneOptions: { where: { email: email } },
      },
      options,
    );
  }

  async findOneUserOrFail(
    findOneOptions: IFindOneOptions,
    options?: IEntityManager,
  ): Promise<UserEntity> {
    const existingUser: UserEntity = await this._userRepository.findOne(
      findOneOptions,
      options,
    );
    if (!existingUser) {
      throw new HttpException('Invalid user', HttpStatus.NOT_FOUND);
    }
    return existingUser;
  }
}
