import { USER_TYPE } from 'src/common/constants/user-type/user.type.constant';

export interface IUserPayload {
  id: number;
  role: USER_TYPE;
}
