import { Module } from '@nestjs/common';
import { GlobalErrorFilter } from './filters/error.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalErrorFilter,
    },
  ],
})
export class ErrorModule {}
