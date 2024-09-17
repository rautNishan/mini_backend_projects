import { Column } from 'typeorm';
import { DataBaseBaseEntity } from './base.entity';
import { USER_TYPE } from 'src/common/constants/user-type/user.type.constant';

export class BaseUserEntity extends DataBaseBaseEntity {
  @Column({
    name: 'email',
    type: 'varchar',
    default: '',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    default: '',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: USER_TYPE,
    nullable: false,
  })
  role: USER_TYPE;
}
