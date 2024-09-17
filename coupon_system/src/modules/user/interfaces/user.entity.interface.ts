export interface IFullName {
  firstName: string;
  middleName?: string | null;
  lastName: string;
}

export interface IUser {
  fullName: IFullName;
  email: string;
  contactNumber: string;
  password: string;
  //   userName: string;
}
