import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AbstractUserService } from 'src/modules/user/abstract/user.service.abstract';
import { UserEntity } from 'src/modules/user/enitity/user.entity';
import { UserCreateDto } from '../dtos/user.create.dto';
import { UserLoginDto } from '../dtos/user.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userService: AbstractUserService,
  ) {}

  async login(incomingUser: UserLoginDto) {
    const existingUser: UserEntity = await this._userService.findOneUserOrFail({
      findOneOptions: {
        where: { email: incomingUser.email },
      },
    });
    console.log('This is Existing User: ', existingUser);

    return 'token';
  }

  async checkAuth() {}

  async authMe(token: string) {
    console.log('This is Token', token);
  }

  async register(incomingData: UserCreateDto) {
    console.log('This is incoming data: ', incomingData);
  }
}
