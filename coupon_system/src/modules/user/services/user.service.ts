import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  IEntityManager,
  IFindOneOptions,
} from 'src/common/database/postgres/base/repository/interfaces/base.repository.interface';
import { DeepPartial } from 'typeorm';
import { AbstractUserService } from '../abstract/user.service.abstract';
import { UserEntity } from '../enitity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { PaginationQueryDto } from 'src/common/request/query/request.pagination.query';
import { USER_TYPE } from 'src/common/constants/user-type/user.type.constant';

@Injectable()
export class UserService extends AbstractUserService {
  constructor(private readonly _userRepository: UserRepository) {
    super();
  }

  async create(createData: DeepPartial<UserEntity>, options?: IEntityManager) {
    try {
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
      createData.role = USER_TYPE.USER;
      return await this._userRepository.create(createData);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOneOrNull(
    findOneOptions: IFindOneOptions<UserEntity>,
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
    findOneOptions: IFindOneOptions<UserEntity>,
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

  async findOneByIdOrFail(
    id: number,
    options?: IFindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    const existingUser = await this._userRepository.findOneById(id, options);
    if (!existingUser) {
      throw new HttpException('Invalid user', HttpStatus.NOT_FOUND);
    }
    return existingUser;
  }

  async findAll(paginationQuery?: PaginationQueryDto): Promise<UserEntity[]> {
    try {
      return this._userRepository.findAll(paginationQuery, {
        findOneOptions: {
          select: ['id'],
        },
      });
    } catch (error) {
      console.log('This is Error: ', error);
      throw error;
    }
  }
}
