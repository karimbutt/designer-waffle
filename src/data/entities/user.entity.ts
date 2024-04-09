export interface IUser extends IUserBase {
  id: string;
}

export interface IUserBase {
  firstName: string;
  lastName: string;
  email: string;
  timezone: string;
}
