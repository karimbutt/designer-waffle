// src/api/tasksApi.ts
import RootStore from '../../../stores/root.store';
import AppApi from '../app-api';
import { ITask, ITaskBase, TaskStatus } from '../../../entities/task.entity';

export default class TasksApi {
  constructor(
    private api: AppApi,
    private store: RootStore
  ) {}

  async createTask(taskData: ITaskBase) {
    try {
      const response = await this.api.client.post<ITask>('/tasks', taskData);
      this.store.taskStore.loadTask(response.data.id, response.data);
      return response.data;
    } catch (error) {
      console.error('Create task failed:', error);
      throw error;
    }
  }

  /**
   * Fetches all tasks with optional pagination and filtering.
   * @param params Optional parameters for pagination and filtering
   */
  async getAllTasks(params?: {
    page?: number;
    limit?: number;
    status?: TaskStatus[];
    dueDateBefore?: string;
    dueDateAfter?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.status) params.status.forEach((status) => queryParams.append('status', status));
        if (params.dueDateBefore) queryParams.append('dueDateBefore', params.dueDateBefore);
        if (params.dueDateAfter) queryParams.append('dueDateAfter', params.dueDateAfter);
      }
      const response = await this.api.client.get<ITask[]>(`/tasks?${queryParams.toString()}`);
      this.store.taskStore.loadTasks(response.data);
      return response.data;
    } catch (error) {
      console.error('Get all tasks failed:', error);
      throw error;
    }
  }

  async getTaskById(taskId: string) {
    try {
      const response = await this.api.client.get<ITask>(`/tasks/${taskId}`);
      this.store.taskStore.loadTask(taskId, response.data);
      return response.data;
    } catch (error) {
      console.error('Get task failed:', error);
      throw error;
    }
  }

  async updateTask(taskId: string, updatedTaskData: Partial<ITaskBase>) {
    try {
      const response = await this.api.client.put<ITask>(`/tasks/${taskId}`, updatedTaskData);
      this.store.taskStore.updateTask(taskId, { ...response.data, id: taskId });
      return response.data;
    } catch (error) {
      console.error('Update task failed:', error);
      throw error;
    }
  }

  async deleteTask(taskId: string) {
    try {
      await this.api.client.delete(`/tasks/${taskId}`);
      this.store.taskStore.deleteTask(taskId);
    } catch (error) {
      console.error('Delete task failed:', error);
      throw error;
    }
  }
}
