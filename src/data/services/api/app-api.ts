// src/api/appApi.ts
import axiosClient from './api-client';
import RootStore from '../../stores/root.store';
import AuthApi from './auth/auth.api';
import ContactsApi from './contacts/contacts.api';
import NotesApi from './notes/notes.api';
import RawInputsApi from './raw-inputs/raw-inputs.api';
import EventsApi from './events/events.api';

export default class AppApi {
  public client = axiosClient;
  public auth: AuthApi;
  public contacts: ContactsApi;
  public notes: NotesApi;
  public rawInputs: RawInputsApi;
  public events: EventsApi;

  constructor(store: RootStore) {
    this.auth = new AuthApi(this, store);
    this.contacts = new ContactsApi(this, store);
    this.notes = new NotesApi(this, store);
    this.rawInputs = new RawInputsApi(this);
    this.events = new EventsApi(this, store);
  }
}
