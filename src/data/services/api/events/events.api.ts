// src/api/eventsApi.ts
import RootStore from '../../../stores/root.store';
import AppApi from '../app-api';
import { IEvent, IEventBase } from '../../../entities/event.entity';
import { FindEventsDto } from './dto/find-events.dto';

export default class EventsApi {
  constructor(
    private api: AppApi,
    private store: RootStore,
  ) {}

  async createEvent(eventData: IEventBase) {
    try {
      const response = await this.api.client.post<IEvent>('/events', eventData);
      this.store.events.setEvent(response.data.id, response.data);
      return response.data;
    } catch (error) {
      console.error('Create event failed:', error);
      throw error;
    }
  }

  async getAllEvents({ startDate, endDate, contactId }: FindEventsDto) {
    try {
      const params: FindEventsDto = { startDate, endDate, contactId };
      const response = await this.api.client.get<IEvent[]>('/events', { params });
      this.store.events.setEvents(response.data);
      console.log('getAllEvents', response.data);
      return response.data;
    } catch (error) {
      console.error('Get all events failed:', error);
      throw error;
    }
  }

  async getEventById(eventId: string) {
    try {
      const response = await this.api.client.get<IEvent>(`/events/${eventId}`);
      this.store.events.setEvent(response.data.id, response.data);
      return response.data;
    } catch (error) {
      console.error('Get event failed:', error);
      throw error;
    }
  }

  async updateEvent(eventId: string, eventData: IEventBase) {
    try {
      const response = await this.api.client.put<IEvent>(`/events/${eventId}`, eventData);
      this.store.events.updateEvent(eventId, response.data);
      return response.data;
    } catch (error) {
      console.error('Update event failed:', error);
      throw error;
    }
  }

  async deleteEvent(eventId: string) {
    try {
      await this.api.client.delete(`/events/${eventId}`);
      this.store.events.deleteEvent(eventId);
    } catch (error) {
      console.error('Delete event failed:', error);
      throw error;
    }
  }
}
