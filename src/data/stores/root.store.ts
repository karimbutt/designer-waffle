import { makeAutoObservable } from 'mobx';
import UserStore from './user.store';
import ContactStore from './contact.store';
import NoteStore from './note.store';
import UiStore from './ui.store';

export default class RootStore {
  user: UserStore;
  contacts: ContactStore;
  notes: NoteStore;
  ui: UiStore;

  constructor() {
    this.user = new UserStore(this);
    this.contacts = new ContactStore(this);
    this.notes = new NoteStore(this);
    this.ui = new UiStore(this);
    makeAutoObservable(this);
  }
}
