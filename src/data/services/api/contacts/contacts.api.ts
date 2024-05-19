// src/api/contactsApi.ts
import RootStore from '../../../stores/root.store';
import AppApi from '../app-api';
import { IContactBase, IContact } from '../../../entities/contact.entity';

export default class ContactsApi {
  constructor(
    private api: AppApi,
    private store: RootStore,
  ) {}

  async createContact(contactData: IContactBase) {
    try {
      const response = await this.api.client.post<IContact>('/contacts', contactData);
      this.store.contacts.loadContact(response.data.id, response.data);
      return response.data;
    } catch (error) {
      console.error('Create contact failed:', error);
      throw error;
    }
  }

  async getAllContacts() {
    try {
      const response = await this.api.client.get<IContact[]>('/contacts');
      this.store.contacts.loadContacts(response.data);
      return response.data;
    } catch (error) {
      console.error('Get all contacts failed:', error);
      throw error;
    }
  }

  async getContactById(contactId: string) {
    try {
      const response = await this.api.client.get<IContact>(`/contacts/${contactId}`);
      this.store.contacts.loadContact(response.data.id, response.data);
      return response.data;
    } catch (error) {
      console.error('Get contact failed:', error);
      throw error;
    }
  }

  async updateContact(contactId: string, contactData: IContactBase) {
    try {
      const response = await this.api.client.put<IContact>(`/contacts/${contactId}`, contactData);
      this.store.contacts.updateContact(contactId, response.data);
      return response.data;
    } catch (error) {
      console.error('Update contact failed:', error);
      throw error;
    }
  }

  async deleteContact(contactId: string) {
    try {
      await this.api.client.delete(`/contacts/${contactId}`);
      this.store.contacts.deleteContact(contactId);
    } catch (error) {
      console.error('Delete contact failed:', error);
      throw error;
    }
  }
}
