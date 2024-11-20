import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationRepository } from './repositories/notification.repository';

@Module({
  providers: [NotificationRepository],
  exports: [NotificationRepository],
  controllers: [],
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
})
export class NotificationRepositoryModule {}
