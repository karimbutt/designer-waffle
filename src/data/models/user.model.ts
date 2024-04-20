import { IUser } from '../entities/user.entity';
import RootStore from '../stores/root.store';

export default class User implements IUser {
  id: string;
  // firstName: string;
  // lastName: string;
  email: string;
  // timezone: string;

  constructor(
    private store: RootStore,
    user: IUser
  ) {
    this.id = user.id;
    // this.firstName = user.firstName;
    // this.lastName = user.lastName;
    this.email = user.email;
    // this.timezone = user.timezone;
  }
}
