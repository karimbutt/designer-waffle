// src/api/appApi.ts
import axiosClient from './api-client';
import RootStore from '../../stores/root.store';
import AuthApi from './auth/auth.api';
import ContactsApi from './contacts/contacts.api';
import NotesApi from './notes/notes.api';
import TasksApi from './tasks/tasks.api';
import InteractionsApi from './interactions/interactions.api';

export default class AppApi {
  public client = axiosClient;
  public auth: AuthApi;
  public contacts: ContactsApi;
  public notes: NotesApi;
  public tasks: TasksApi;
  public interactions: InteractionsApi;

  constructor(store: RootStore) {
    this.auth = new AuthApi(this, store);
    this.contacts = new ContactsApi(this, store);
    this.notes = new NotesApi(this, store);
    this.tasks = new TasksApi(this, store);
    this.interactions = new InteractionsApi(this, store);
  }
}
