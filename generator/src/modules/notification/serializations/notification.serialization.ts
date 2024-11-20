import { ApiProperty } from '@nestjs/swagger';
import {
  ResponseDefaultSerialization,
  ResponsePaginationDefaultSerialization,
} from 'src/common/doc/serializations/response.default.serialization';
import { NotificationEntity } from '../repository/entities/notification.entity';

export class NotificationSerialization extends ResponseDefaultSerialization {
  @ApiProperty({
    type: NotificationEntity,
  })
  data: NotificationEntity;
}

export class NotificationPaginationSerialization extends ResponsePaginationDefaultSerialization {
  @ApiProperty({
    type: [NotificationEntity],
  })
  data: NotificationEntity;
}
