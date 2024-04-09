import { observable, makeAutoObservable } from 'mobx';
import RootStore from './root.store';
import { INote } from '../entities/note.entity';

export default class NoteStore {
  notesById = observable.map<string, INote>();

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  loadNotes(notes: INote[]) {
    notes.forEach((note) => {
      this.notesById.set(note.id, note); // Assuming contactId can serve as a unique key
    });
  }

  loadNote(noteId: string, note: INote) {
    this.notesById.set(noteId, note);
  }

  get notes() {
    return Array.from(this.notesById.values());
  }

  updateNote(contactId: string, updatedNote: Partial<INote>) {
    const existingNote = this.notesById.get(contactId);
    if (existingNote) {
      this.notesById.set(contactId, { ...existingNote, ...updatedNote });
    }
  }

  deleteNote(contactId: string) {
    this.notesById.delete(contactId);
  }
}
