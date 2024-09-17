import { USER_TYPE } from 'src/common/constants/user-type/user.type.constant';

export interface IAdminEntity {
  email: string;
  password: string;
  role: USER_TYPE;
}
