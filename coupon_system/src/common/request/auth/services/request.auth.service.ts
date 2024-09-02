import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/modules/user/enitity/user.entity';
import { UserLoginDto } from '../dtos/user.login.dto';
import { UserCreateDto } from '../dtos/user.create.dto';

@Injectable()
export class AuthService {
  constructor(private readonly _jwtService: JwtService) {}

  async login(incomingUser: UserLoginDto, existingUser: UserEntity) {
    console.log('This is incoming user: ', incomingUser);
    console.log('This is existing user: ', existingUser);
  }

  async checkAuth() {}

  async authMe(token: string) {
    console.log('This is Token', token);
  }

  async register(incomingData: UserCreateDto) {
    console.log('This is incoming data: ', incomingData);
  }
}
