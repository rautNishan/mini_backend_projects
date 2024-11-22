import { Module } from '@nestjs/common';
import { PrismaService } from './connection/services/prisma.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
})
export class DataBaseModule {}
