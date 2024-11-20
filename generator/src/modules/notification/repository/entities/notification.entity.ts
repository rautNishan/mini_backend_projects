import { Expose } from 'class-transformer';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/common/database/constant/serialization-group.constant';
import { Column, Entity, Index } from 'typeorm';
import { INotification } from '../../interfaces/notification.interface';
import { SYSTEM_PREFIX } from 'src/common/database/constant/prefix';

export const TABLE_NAME = 'notification';
@Entity({ name: TABLE_NAME })
export class NotificationEntity extends DatabaseBaseEntity implements INotification {
  // ======================
  // Columns===============
  // ======================


  @Expose({ groups: ALL_GROUP })
  @Index()
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  // ======================
  // Computed columns======
  // ======================
  
  // ======================
  // Relations=============
  // ======================

  // ======================
  // Hooks=================
  // ======================
}
