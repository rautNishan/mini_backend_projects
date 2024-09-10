import { SetMetadata, applyDecorators } from '@nestjs/common';
import { RESPONSE_MESSAGE_META } from '../constants/response.constant';

export function ResponseMessage(message: string): MethodDecorator {
  return applyDecorators(SetMetadata(RESPONSE_MESSAGE_META, message));
}
