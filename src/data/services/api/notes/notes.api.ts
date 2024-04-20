// src/api/notesApi.ts
import RootStore from '../../../stores/root.store';
import AppApi from '../app-api';
import { INote, INoteBase } from '../../../entities/note.entity';

export default class NotesApi {
  constructor(
    private api: AppApi,
    private store: RootStore
  ) {}

  async createNote(noteData: INoteBase) {
    try {
      const response = await this.api.client.post<INote>('/notes', noteData);
      this.store.noteStore.loadNote(response.data.id, response.data);
      return response.data;
    } catch (error) {
      console.error('Create note failed:', error);
      throw error;
    }
  }

  /**
   * Fetches all notes with optional filtering and pagination.
   * @param params Optional parameters for filtering and pagination
   */
  async getAllNotes(params?: {
    page?: number;
    limit?: number;
    contactId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.contactId) queryParams.append('contactId', params.contactId);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);
      }
      const response = await this.api.client.get<[INote[], number]>(
        `/notes?${queryParams.toString()}`
      );
      console.log(response.data[0]);
      this.store.noteStore.loadNotes(response.data[0]);
      return response.data;
    } catch (error) {
      console.error('Get all notes failed:', error);
      throw error;
    }
  }

  async getNoteById(noteId: string) {
    try {
      const response = await this.api.client.get<INote>(`/notes/${noteId}`);
      this.store.noteStore.loadNote(noteId, response.data);
      return response.data;
    } catch (error) {
      console.error('Get note failed:', error);
      throw error;
    }
  }

  async updateNote(noteId: string, updatedNoteData: Partial<INote>) {
    try {
      const response = await this.api.client.put<INote>(`/notes/${noteId}`, updatedNoteData);
      this.store.noteStore.updateNote(noteId, response.data);
      return response.data;
    } catch (error) {
      console.error('Update note failed:', error);
      throw error;
    }
  }

  async deleteNote(noteId: string) {
    try {
      await this.api.client.delete(`/notes/${noteId}`);
      this.store.noteStore.deleteNote(noteId);
    } catch (error) {
      console.error('Delete note failed:', error);
      throw error;
    }
  }
}
