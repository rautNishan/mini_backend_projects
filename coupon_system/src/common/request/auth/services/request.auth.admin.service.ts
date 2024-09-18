import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AbstractAdminService } from 'src/modules/admin/abstract/admin.service.abstract';
import { AdminEntity } from 'src/modules/admin/enitity/admin.entity';
import { UserCreateDto } from '../dtos/user.create.dto';
import { UserLoginDto } from '../dtos/user.login.dto';
import { IUserPayload } from '../interfaces/auth.interface';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _adminService: AbstractAdminService,
    private readonly _configService: ConfigService,
  ) {}

  async login(incomingUser: UserLoginDto) {
    try {
      console.log('This is incomingUser: ', incomingUser);

      const existingAdmin: AdminEntity =
        await this._adminService.findOneUserOrFail({
          findOneOptions: {
            where: { email: incomingUser.email },
          },
        });
      console.log(
        '🚀 ~ AuthAdminService ~ login ~ existingAdmin:',
        existingAdmin,
      );

      await this.checkCredentials(incomingUser, existingAdmin);
      const payLoad: IUserPayload = {
        id: existingAdmin.id,
        role: existingAdmin.role,
      };

      const mySecretKey = this._configService.get<string>('auth.jwt_secret');

      const token = this._jwtService.sign(payLoad, {
        secret: mySecretKey,
      });

      return token;
    } catch (error) {
      console.log('This is error: ', error);
      throw error;
    }
  }

  async checkCredentials(
    incomingData: UserLoginDto,
    existingUser: AdminEntity,
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
