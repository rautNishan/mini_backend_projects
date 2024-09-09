import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ParamGuard } from '../guards/request.param.guard';
import { REQUEST_PARAM_CLASS_DTOS_META_KEY } from '../constants/request.constants';

export function RequestParamGuard(
  ...classValidation: ClassConstructor<any>[]
): MethodDecorator {
  return applyDecorators(
    SetMetadata(REQUEST_PARAM_CLASS_DTOS_META_KEY, classValidation),
    UseGuards(ParamGuard),
  );
}
