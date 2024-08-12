import { DataBaseBaseEntity } from 'src/common/database/base/entity/base.entity';
import { IFullName, IUserEntity } from '../interfaces/user.entity.interface';
import { USER_TYPE } from 'src/common/constants/user-type/user.type.constant';
import { Column, Entity } from 'typeorm';

export class UserFullName implements IFullName {
  firstName: string;
  middleName?: string | null;
  lastName: string;
}

export const USER_TABLE_NAME = 'users';
@Entity({ name: USER_TABLE_NAME })
export class UserEntity extends DataBaseBaseEntity implements IUserEntity {
  @Column({ name: 'full_name', type: 'jsonb', nullable: false })
  fullName: UserFullName;

  @Column({ name: 'contact_number', type: 'varchar', nullable: false })
  contactNumber: string;

  @Column({ name: 'email', type: 'varchar', nullable: false })
  email: string;

  @Column({
    name: 'user_type',
    type: 'enum',
    enum: USER_TYPE,
    nullable: false,
    default: USER_TYPE.USER,
  })
  userType: USER_TYPE;
}
