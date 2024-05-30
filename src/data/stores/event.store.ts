import { observable, makeAutoObservable } from 'mobx';
import RootStore from './root.store';
import { IEvent } from '../entities/event.entity';
import Event from '../models/event.model';
import { eachDayOfInterval, format } from 'date-fns';

export type EventsGroupedByDate = { [date: string]: IEvent[] };

export const groupEventsByDate = (events: IEvent[]): EventsGroupedByDate => {
  const groupedEvents: EventsGroupedByDate = {};

  events.forEach((event) => {
    // Get all dates the event spans
    const dates = eachDayOfInterval({
      start: event.startDate,
      end: event.endDate,
    });

    dates.forEach((date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      if (!groupedEvents[dateString]) {
        groupedEvents[dateString] = [];
      }
      groupedEvents[dateString].push(event);
    });
  });

  Object.keys(groupedEvents).forEach((date) => {
    groupedEvents[date].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  });

  return groupedEvents;
};

export default class EventStore {
  byId = observable.map<string, Event>();

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setEvents(events: IEvent[]) {
    events.forEach((event) => {
      this.setEvent(event.id, event);
      // this.byId.set(event.id, new Event(this.rootStore, event));
    });
  }

  setEvent(eventId: string, event: IEvent) {
    const dateChangedEvent: IEvent = {
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
    };

    this.byId.set(event.id, new Event(this.rootStore, dateChangedEvent));
  }

  updateEvent(id: string, updated: IEvent) {
    // Remove the existing event
    this.byId.delete(id);

    // Create a new Event instance with the updated properties
    const newEvent = new Event(this.rootStore, updated as IEvent);

    // Add the updated event back into the map
    this.byId.set(id, newEvent);
  }

  deleteEvent(eventId: string) {
    this.byId.delete(eventId);
  }

  get byDate() {
    return groupEventsByDate(this.all);
  }

  // Computed
  get all() {
    return Array.from(this.byId.values());
  }
}
