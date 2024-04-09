import { IAddress, IContact, IEmail, IPhoneNumber } from '../entities/contact.entity';
import { IInteraction } from '../entities/interaction.entity';
import { INote } from '../entities/note.entity';
import { ITask } from '../entities/task.entity';
import RootStore from '../stores/root.store';

export default class Contact implements IContact {
  id: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  userId: string;
  phones: IPhoneNumber[];
  emails: IEmail[];
  address: IAddress;

  constructor(
    private store: RootStore,
    contact: IContact
  ) {
    this.id = contact.id;
    this.firstName = contact.firstName;
    this.lastName = contact.lastName;
    this.birthday = contact.birthday;
    this.userId = contact.userId;
    this.phones = contact.phones.map((phone) => ({
      id: phone.id,
      type: phone.type,
      number: phone.number
    }));
    this.emails = contact.emails.map((email) => ({
      id: email.id,
      email: email.email,
      type: email.type
    }));
    this.address = { ...contact.address };
  }

  get tasks(): ITask[] {
    return this.store.taskStore.tasks.filter((task) => task.contactIds.includes(this.id));
  }

  get interactions(): IInteraction[] {
    return this.store.interactionStore.interactions.filter(
      (interaction) => interaction.contactId === this.id
    );
  }

  get notes(): INote[] {
    return this.store.noteStore.notes.filter((note) => note.contactId === this.id);
  }
}
