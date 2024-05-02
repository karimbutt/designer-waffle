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
    // TODO: In the future, creating a new instance of an object and updating a collection (like observable.map) is more resource-intensive than merely updating existing properties
    // Remove the existing note
    this.byId.delete(id);

    // Create a new Note instance with the updated properties
    const newNote = new Contact(this.rootStore, updated);

    // Add the updated note back into the map
    this.byId.set(id, newNote);
  }

  deleteContact(contactId: string) {
    this.byId.delete(contactId);
  }

  get contacts() {
    return Array.from(this.byId.values());
  }

  loadCurrentSelectedContact(contactData: IContact) {
    this.currentSelectedContact = new Contact(this.rootStore, contactData);
  }
}
