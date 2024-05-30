import { makeAutoObservable } from 'mobx';
import { IContact } from '../entities/contact.entity';
import { INote } from '../entities/note.entity';
import RootStore from '../stores/root.store';
import { EventsGroupedByDate, groupEventsByDate } from '../stores/event.store';
import { IEvent } from '../entities/event.entity';

export default class Contact implements IContact {
  id: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  userId: string;

  currentSelectedNoteId: string | null = null;

  constructor(
    private store: RootStore,
    contact: IContact,
  ) {
    this.id = contact.id;
    this.firstName = contact.firstName;
    this.lastName = contact.lastName;
    this.birthday = contact.birthday;
    this.userId = contact.userId;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  get notes(): INote[] {
    return this.store.notes.notes
      .filter((note) => note.contactId === this.id)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  get eventsByDate(): EventsGroupedByDate {
    return groupEventsByDate(this.events);
  }

  get events(): IEvent[] {
    return this.store.events.all.filter((e) => e.contactId == this.id);
  }

  selectNextNote() {
    const notes = this.notes;
    const currentIndex = notes.findIndex((note: INote) => note.id === this.currentSelectedNoteId);
    const nextIndex = (currentIndex + 1) % notes.length; // Wrap around to the start
    this.currentSelectedNoteId = notes[nextIndex]?.id;
  }

  selectPreviousNote() {
    const notes = this.notes;
    const currentIndex = notes.findIndex((note: INote) => note.id === this.currentSelectedNoteId);
    const previousIndex = (currentIndex - 1 + notes.length) % notes.length; // Wrap around to the end
    this.currentSelectedNoteId = notes[previousIndex]?.id;
  }

  setCurrentSelectedNote(noteId: string | null): void {
    this.currentSelectedNoteId = noteId;
  }
}
