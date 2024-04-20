import { IContact } from '../data/entities/contact.entity';

export const getContactInitials = (contact: IContact) => {
  return `${contact.firstName[0]}${contact.lastName[0]}`;
};
