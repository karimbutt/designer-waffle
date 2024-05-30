import { IEvent } from '../entities/event.entity';
import RootStore from '../stores/root.store';

export default class Event implements IEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  recurrenceRule?: string;
  notes?: string[];
  contactId: string;
  isAllDay: boolean;

  constructor(
    private store: RootStore,
    event: IEvent,
  ) {
    this.id = event.id;
    this.title = event.title;
    this.startDate = new Date(event.startDate);
    this.endDate = event.endDate;
    this.recurrenceRule = event.recurrenceRule;
    this.notes = event.notes;
    this.contactId = event.contactId;
    this.isAllDay = event.isAllDay;
  }

  // Relationship to fetch related contact
  get contact() {
    return this.store.contacts.byId.get(this.contactId);
  }

  // Relationship to fetch related notes
  get relatedNotes() {
    return this.notes?.map((noteId) => this.store.notes.byId.get(noteId));
  }

  // Method to check if the event is recurring
  isRecurring() {
    return !!this.recurrenceRule;
  }
}
