import { observable, makeAutoObservable } from 'mobx';
import RootStore from './root.store';
import { INote } from '../entities/note.entity';
import Note from '../models/note.model';

export default class NoteStore {
  byId = observable.map<string, Note>();

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setNotes(notes: INote[]) {
    notes.forEach((note) => {
      this.byId.set(note.id, new Note(this.rootStore, note));
    });
  }

  setNote(noteId: string, note: INote) {
    this.byId.set(note.id, new Note(this.rootStore, note));
  }

  updateNote(id: string, updated: INote) {
    // TODO: In the future, creating a new instance of an object and updating a collection (like observable.map) is more resource-intensive than merely updating existing properties
    // Remove the existing note
    this.byId.delete(id);

    // Create a new Note instance with the updated properties
    const newNote = new Note(this.rootStore, updated as INote);

    // Add the updated note back into the map
    this.byId.set(id, newNote);
  }

  deleteNote(contactId: string) {
    this.byId.delete(contactId);
  }

  // Computed
  get notes() {
    return Array.from(this.byId.values());
  }
}
