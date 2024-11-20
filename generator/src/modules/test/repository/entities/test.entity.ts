import { Expose } from 'class-transformer';
import { DatabaseBaseEntity } from 'src/common/database/base/entity/BaseEntity';
import { ALL_GROUP } from 'src/common/database/constant/serialization-group.constant';
import { Column, Entity, Index } from 'typeorm';
import { ITest } from '../../interfaces/test.interface';
import { SYSTEM_PREFIX } from 'src/common/database/constant/prefix';

export const TABLE_NAME = 'test';
@Entity({ name: TABLE_NAME })
export class TestEntity extends DatabaseBaseEntity implements ITest {
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
