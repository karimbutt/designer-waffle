import { ITask, TaskStatus } from '../entities/task.entity';
import RootStore from '../stores/root.store';

export default class Task implements ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  contactIds: string[];
  interactionId?: string;

  constructor(
    private store: RootStore,
    task: ITask
  ) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.status = task.status;
    this.contactIds = task.contactIds;
    this.interactionId = task.interactionId;
  }

  // Relationship to fetch related contacts
  get contacts() {
    return this.contactIds
      .map((id) => this.store.contactStore.contactsById.get(id))
      .filter((contact) => contact);
  }
}
