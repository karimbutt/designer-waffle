import { PartialBlock } from '@blocknote/core';
import { INote } from '../entities/note.entity';
import RootStore from '../stores/root.store';

export default class Note implements INote {
  id: string;
  contactId: string;
  title: string;
  body?: PartialBlock[];
  updatedAt: Date;

  constructor(
    private store: RootStore,
    note: INote,
  ) {
    this.id = note.id;
    this.title = note.title;
    this.contactId = note.contactId;
    this.body = note.body;
    this.updatedAt = new Date(note.updatedAt);
  }

  // Relationship to fetch related contact
  get contact() {
    return this.store.contacts.byId.get(this.contactId);
  }
}
