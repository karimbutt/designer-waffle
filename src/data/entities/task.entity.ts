export interface ITask extends ITaskBase {
  id: string;
}

export interface ITaskBase {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  contactIds: string[];
  interactionId?: string;
}

export type TaskStatus = 'backlog' | 'in progress' | 'complete';
