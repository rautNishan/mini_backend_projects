import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/request.auth.guard';

export function UserProtected(): MethodDecorator {
  return applyDecorators(UseGuards(new AuthGuard()));
}
