import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { UserEntity } from '../enitity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}
  async getUser() {
    return 'User:1';
  }

  async create(createData: DeepPartial<UserEntity>) {
    console.log('This is CreateData: ', createData);
    return await this._userRepository.create(createData);
  }
}
