import { observable, makeAutoObservable } from 'mobx';
import RootStore from './root.store';
import { ITask } from '../entities/task.entity';

export default class TaskStore {
  tasksById = observable.map<string, ITask>();

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  loadTasks(tasks: ITask[]) {
    tasks.forEach((task) => {
      this.loadTask(task.id, task);
    });
  }

  loadTask(taskId: string, task: ITask) {
    this.tasksById.set(task.id, task);
  }

  updateTask(taskId: string, updatedTask: Partial<ITask>) {
    const existingTask = this.tasksById.get(taskId);
    if (existingTask) {
      this.tasksById.set(taskId, { ...existingTask, ...updatedTask });
    }
  }

  deleteTask(taskId: string) {
    this.tasksById.delete(taskId);
  }

  get tasks() {
    return Array.from(this.tasksById.values());
  }
}
