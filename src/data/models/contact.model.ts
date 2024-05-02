import { IContact } from '../entities/contact.entity';
import { INote } from '../entities/note.entity';
import RootStore from '../stores/root.store';

export default class Contact implements IContact {
  id: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  userId: string;

  constructor(
    private store: RootStore,
    contact: IContact,
  ) {
    this.id = contact.id;
    this.firstName = contact.firstName;
    this.lastName = contact.lastName;
    this.birthday = contact.birthday;
    this.userId = contact.userId;
  }

  get notes(): INote[] {
    return this.store.noteStore.notes.filter((note) => note.contactId === this.id);
  }
}
