import { observable, makeAutoObservable } from 'mobx';
import RootStore from './root.store';
import { IContact } from '../entities/contact.entity';
import Contact from '../models/contact.model';

export default class ContactStore {
  currentSelectedContact: Contact | null = null;
  byId = observable.map<string, Contact>();

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  loadContacts(contacts: IContact[]) {
    contacts.forEach((contact) => {
      this.byId.set(contact.id, new Contact(this.rootStore, contact));
    });
  }

  loadContact(contactId: string, contact: IContact) {
    this.byId.set(contact.id, new Contact(this.rootStore, contact));
  }

  updateContact(id: string, updated: IContact) {
    this.byId.delete(id); // Consider updating instead of replacing
    this.byId.set(id, new Contact(this.rootStore, updated));
  }

  deleteContact(contactId: string) {
    this.byId.delete(contactId);
  }

  get contacts() {
    return Array.from(this.byId.values()).sort((a, b) =>
      a.lastName.localeCompare(b.lastName, undefined, { sensitivity: 'base' }),
    );
  }

  setCurrentSelectedContact(contactId: string) {
    this.currentSelectedContact = this.byId.get(contactId) || null;
  }

  selectNextContact() {
    const sortedContacts = this.contacts;
    const currentIndex = sortedContacts.findIndex(
      (contact) => contact.id === this.currentSelectedContact?.id,
    );
    const nextIndex = (currentIndex + 1) % sortedContacts.length; // Wrap around to the start
    this.setCurrentSelectedContact(sortedContacts[nextIndex].id);
  }

  selectPreviousContact() {
    const sortedContacts = this.contacts;
    const currentIndex = sortedContacts.findIndex(
      (contact) => contact.id === this.currentSelectedContact?.id,
    );
    const previousIndex = (currentIndex - 1 + sortedContacts.length) % sortedContacts.length; // Wrap around to the end
    this.setCurrentSelectedContact(sortedContacts[previousIndex].id);
  }
}
