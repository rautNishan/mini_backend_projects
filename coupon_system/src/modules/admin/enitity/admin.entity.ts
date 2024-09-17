import { BaseUserEntity } from 'src/common/database/postgres/base/entity/base.user.entity';
import { Entity } from 'typeorm';
import { IAdminEntity } from '../interfaces/admin.interface';

export const ADMIN_TABLE_NAME = 'admin';
@Entity({ name: ADMIN_TABLE_NAME })
export class AdminEntity extends BaseUserEntity implements IAdminEntity {}
