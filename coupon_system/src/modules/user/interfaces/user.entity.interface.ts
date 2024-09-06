import { USER_TYPE } from 'src/common/constants/user-type/user.type.constant';

export interface IFullName {
  firstName: string;
  middleName?: string | null;
  lastName: string;
}

export interface IUser {
  fullName: IFullName;
  email: string;
  contactNumber: string;
  userType?: USER_TYPE;
  password: string;
  //   userName: string;
}
