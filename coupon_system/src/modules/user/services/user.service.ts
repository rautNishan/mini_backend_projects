import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUser() {
    return 'User:1';
  }
}
