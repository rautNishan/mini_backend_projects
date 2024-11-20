import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationRepositoryModule } from './repository/notification.repository.module';


@Module({
  providers: [NotificationService],
  exports: [NotificationService],
  imports: [NotificationRepositoryModule],
})
export class NotificationModule {}
