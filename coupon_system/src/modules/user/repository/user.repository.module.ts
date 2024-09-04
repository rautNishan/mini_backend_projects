import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from '../enitity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
