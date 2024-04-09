import { INote } from '../entities/note.entity';
import RootStore from '../stores/root.store';

export default class Note implements INote {
  id: string;
  contactId: string;
  textBody: string;
  interactionId?: string;

  constructor(
    private store: RootStore,
    note: INote
  ) {
    this.contactId = note.contactId;
    this.textBody = note.textBody;
    this.interactionId = note.interactionId;
  }

  // Relationship to fetch related contact
  get contact() {
    return this.store.contactStore.contactsById.get(this.contactId);
  }

  // Relationship to fetch related interaction, if exists
  get interaction() {
    return this.interactionId
      ? this.store.interactionStore.interactionsById.get(this.interactionId)
      : null;
  }
}
