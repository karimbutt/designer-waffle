import { observable, makeAutoObservable } from 'mobx';
import RootStore from './root.store';
import { IContact } from '../entities/contact.entity';

export default class ContactStore {
  contactsById = observable.map<string, IContact>();

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  loadContacts(contacts: IContact[]) {
    contacts.forEach((contact) => {
      this.contactsById.set(contact.id, contact);
    });
  }

  loadContact(contactId: string, contact: IContact) {
    this.contactsById.set(contactId, contact);
  }

  updateContact(contact: IContact) {
    const existingContact = this.contactsById.get(contact.id);
    if (existingContact) {
      this.contactsById.set(contact.id, { ...existingContact, ...contact });
    }
  }

  deleteContact(contactId: string) {
    this.contactsById.delete(contactId);
  }

  get contacts() {
    return Array.from(this.contactsById.values());
  }
}
