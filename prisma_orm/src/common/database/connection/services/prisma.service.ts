import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_CLIENT_OPTIONS } from '../config/prisma.config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ ...PRISMA_CLIENT_OPTIONS });
  }
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.log('This is error: ', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Connection destroyed');
  }
}
