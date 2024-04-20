import { makeAutoObservable } from 'mobx';
import UserStore from './user.store';
import ContactStore from './contact.store';
import NoteStore from './note.store';
import TaskStore from './task.store';

export default class RootStore {
  userStore: UserStore;
  contactStore: ContactStore;
  noteStore: NoteStore;
  taskStore: TaskStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.contactStore = new ContactStore(this);
    this.noteStore = new NoteStore(this);
    this.taskStore = new TaskStore(this);
    makeAutoObservable(this);
  }
}
