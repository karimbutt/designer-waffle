import { IInteraction } from '../entities/interaction.entity';
import RootStore from '../stores/root.store';

export default class Interaction implements IInteraction {
  id: string;
  contactId: string;
  rawSummary: string;
  date: string;

  constructor(
    private store: RootStore,
    interaction: IInteraction
  ) {
    this.id = interaction.id;
    this.contactId = interaction.contactId;
    this.rawSummary = interaction.rawSummary;
    this.date = interaction.date;
  }

  // Relationship to fetch the related contact
  get contact() {
    return this.store.contactStore.contactsById.get(this.contactId);
  }

  // Optionally, relate to tasks and notes if needed, depending on your application logic
  get relatedTasks() {
    return this.store.taskStore.tasks.filter((task) => task.interactionId === this.id);
  }

  get relatedNotes() {
    return this.store.noteStore.notes.filter((note) => note.interactionId === this.id);
  }
}
