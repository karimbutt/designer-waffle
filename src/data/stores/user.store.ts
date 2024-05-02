import { makeAutoObservable } from 'mobx';
import RootStore from './root.store';
import User from '../models/user.model';
import { IUser } from '../entities/user.entity';

export default class UserStore {
  currentUser: IUser | null = null;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  loadUser(userData: IUser) {
    this.currentUser = new User(this.rootStore, userData);
  }

  updateUser(updatedUserData: Partial<IUser>) {
    if (this.currentUser) {
      const updatedUser = {
        ...this.currentUser,
        ...updatedUserData,
      };
      this.currentUser = new User(this.rootStore, updatedUser);
    }
  }

  clearUser() {
    this.currentUser = null;
  }
}
