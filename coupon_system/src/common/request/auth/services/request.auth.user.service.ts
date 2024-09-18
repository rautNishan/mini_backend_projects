import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AbstractUserService } from 'src/modules/user/abstract/user.service.abstract';
import { UserEntity } from 'src/modules/user/enitity/user.entity';
import { UserCreateDto } from '../dtos/user.create.dto';
import { UserLoginDto } from '../dtos/user.login.dto';
import { IUserPayload } from '../interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthUserService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userService: AbstractUserService,
    private readonly _configService: ConfigService,
  ) {}

  async login(incomingUser: UserLoginDto) {
    const existingUser: UserEntity = await this._userService.findOneUserOrFail({
      findOneOptions: {
        where: { email: incomingUser.email },
      },
    });

    await this.checkCredentials(incomingUser, existingUser);
    const payLoad: IUserPayload = {
      id: existingUser.id,
      role: existingUser.role,
    };

    const mySecretKey = this._configService.get<string>('auth.jwt_secret');

    const token = await this._jwtService.sign(payLoad, {
      secret: mySecretKey,
    });

    return token;
  }

  async checkCredentials(
    incomingData: UserLoginDto,
    existingUser: UserEntity,
  ): Promise<void> {
    const passwordMatch: boolean = await bcrypt.compare(
      incomingData.password,
      existingUser.password,
    );
    if (!passwordMatch) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async checkAuth() {}

  async authMe(token: string) {
    console.log('This is Token', token);
  }

  async register(incomingData: UserCreateDto) {
    console.log('This is incoming data: ', incomingData);
  }
}
