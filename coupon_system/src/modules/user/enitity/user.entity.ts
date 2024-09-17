import { BaseUserEntity } from 'src/common/database/postgres/base/entity/base.user.entity';
import { Column, Entity } from 'typeorm';
import { IFullName, IUser } from '../interfaces/user.entity.interface';

export class UserFullName implements IFullName {
  firstName: string;
  middleName?: string | null;
  lastName: string;
}

export const USER_TABLE_NAME = 'users';
@Entity({ name: USER_TABLE_NAME })
export class UserEntity extends BaseUserEntity implements IUser {
  @Column({ name: 'full_name', type: 'jsonb', nullable: false })
  fullName: UserFullName;

  @Column({ name: 'contact_number', type: 'varchar', nullable: false })
  contactNumber: string;

  @Column({ name: 'email', type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;
}
