import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/request.auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly _authService: AuthService;

  constructor() {
    this._authService = new AuthService();
  }

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

    return true;
  }

  private checkAuthorized(requestPath: string, userRole: string) {
    if (requestPath != userRole) {
      throw new HttpException('Not Permitted', HttpStatus.FORBIDDEN);
    }
  }
}
