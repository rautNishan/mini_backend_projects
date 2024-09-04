import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/database/base/repository/base.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../enitity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {
    super(_userRepo);
  }
}
