import { IContact } from '../data/entities/contact.entity';

export const groupAndSortContactsAlphabetically = (
  contacts: IContact[],
): Record<string, IContact[]> => {
  const grouped: Record<string, IContact[]> = {};

  // Sort contacts by last name
  contacts.sort((a, b) => a.lastName.localeCompare(b.lastName));

  // Group contacts by the first letter of their last name
  for (const contact of contacts) {
    const letter = contact.lastName.charAt(0).toUpperCase(); // First letter of last name
    if (!grouped[letter]) {
      grouped[letter] = [];
    }
    grouped[letter].push(contact);
  }

  return grouped;
};
