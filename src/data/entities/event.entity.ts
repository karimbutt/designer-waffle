export interface IEvent extends IEventBase {
  id: string;
}

export interface IEventBase {
  title: string;
  startDate: Date;
  endDate: Date;
  recurrenceRule?: string;
  notes?: string[];
  contactId: string;
  isAllDay: boolean;
}
