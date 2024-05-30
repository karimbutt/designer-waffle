import { makeAutoObservable } from 'mobx';
import UserStore from './user.store';
import ContactStore from './contact.store';
import NoteStore from './note.store';
import UiStore from './ui.store';
import EventStore from './event.store';

export default class RootStore {
  user: UserStore;
  contacts: ContactStore;
  notes: NoteStore;
  ui: UiStore;
  events: EventStore;

  constructor() {
    this.user = new UserStore(this);
    this.contacts = new ContactStore(this);
    this.notes = new NoteStore(this);
    this.ui = new UiStore(this);
    this.events = new EventStore(this);
    makeAutoObservable(this);
  }
}
