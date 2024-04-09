import { makeAutoObservable } from 'mobx';
import UserStore from './user.store';
import ContactStore from './contact.store';
import NoteStore from './note.store';
import TaskStore from './task.store';
import InteractionStore from './interaction.store';

export default class RootStore {
  userStore: UserStore;
  contactStore: ContactStore;
  noteStore: NoteStore;
  taskStore: TaskStore;
  interactionStore: InteractionStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.contactStore = new ContactStore(this);
    this.noteStore = new NoteStore(this);
    this.taskStore = new TaskStore(this);
    this.interactionStore = new InteractionStore(this);
    makeAutoObservable(this);
  }
}
