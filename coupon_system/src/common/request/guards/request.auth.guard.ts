import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IUserPayload } from '../auth/interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestPath = request?.originalUrl?.split('/')[1];
    const incomingToken = request.headers?.authorization?.split(' ')[1];
    console.log('This is Request Path: ', requestPath);

    if (!incomingToken) {
      throw new HttpException('Not Authenticated', HttpStatus.FORBIDDEN);
    }
    //decode token

    const decodedToken: IUserPayload = this._jwtService.decode(incomingToken);
    console.log('This is decoded token: ', decodedToken);

    this.checkAuthorized(requestPath, decodedToken.role);
    return true;
  }

  private checkAuthorized(requestPath: string, userRole: string) {
    if (requestPath != userRole) {
      throw new HttpException('Not Permitted', HttpStatus.FORBIDDEN);
    }
  }
}
