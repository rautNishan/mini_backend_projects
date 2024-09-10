import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
@Injectable()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let _status: HttpStatus | number = HttpStatus.INTERNAL_SERVER_ERROR;
    let _message: string = 'Internal Server Error.';

    if (exception instanceof HttpException) {
      _status = exception.getStatus();
      _message = exception.message;
    } else if (typeof exception === 'object' && exception != null) {
      _status = _status;
      _message = _message;
    }
    response.status(_status).json({
      language: 'en',
      time: new Date().toISOString(),
      request: {
        method: request.method,
        url: request.url,
      },
      statusCode: _status,
      message: _message,
    });
  }
}
