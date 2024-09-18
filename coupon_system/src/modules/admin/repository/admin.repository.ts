import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/postgres/base/repository/base.repository';
import { Repository } from 'typeorm';
import { AdminEntity } from '../enitity/admin.entity';

@Injectable()
export class AdminRepository extends BaseRepository<AdminEntity> {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly _adminRepo: Repository<AdminEntity>,
  ) {
    super(_adminRepo);
  }
}
