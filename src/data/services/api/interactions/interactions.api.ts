// src/api/interactionsApi.ts
import RootStore from '../../../stores/root.store';
import AppApi from '../app-api';
import { IInteraction, IInteractionBase } from '../../../entities/interaction.entity';

export default class InteractionsApi {
  constructor(
    private api: AppApi,
    private store: RootStore
  ) {}

  async createInteraction(interactionData: IInteractionBase) {
    try {
      const response = await this.api.client.post<IInteraction>('/interactions', interactionData);
      this.store.interactionStore.loadInteraction(response.data.id, response.data);
      return response.data;
    } catch (error) {
      console.error('Create interaction failed:', error);
      throw error;
    }
  }

  /**
   * Fetches all interactions with optional filtering and pagination.
   * @param params Optional parameters for filtering and pagination
   */
  async getAllInteractions(params?: {
    page?: number;
    limit?: number;
    contactId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.contactId) queryParams.append('contactId', params.contactId);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);
      }
      const response = await this.api.client.get<IInteraction[]>(
        `/interactions?${queryParams.toString()}`
      );
      this.store.interactionStore.loadInteractions(response.data);
      return response.data;
    } catch (error) {
      console.error('Get all interactions failed:', error);
      throw error;
    }
  }

  async getInteractionById(interactionId: string) {
    try {
      const response = await this.api.client.get<IInteraction>(`/interactions/${interactionId}`);
      this.store.interactionStore.loadInteraction(interactionId, response.data);
      return response.data;
    } catch (error) {
      console.error('Get interaction failed:', error);
      throw error;
    }
  }

  async updateInteraction(
    interactionId: string,
    updatedInteractionData: Partial<IInteractionBase>
  ) {
    try {
      const response = await this.api.client.put<IInteraction>(
        `/interactions/${interactionId}`,
        updatedInteractionData
      );
      this.store.interactionStore.updateInteraction(interactionId, response.data);
      return response.data;
    } catch (error) {
      console.error('Update interaction failed:', error);
      throw error;
    }
  }

  async deleteInteraction(interactionId: string) {
    try {
      await this.api.client.delete(`/interactions/${interactionId}`);
      this.store.interactionStore.deleteInteraction(interactionId);
    } catch (error) {
      console.error('Delete interaction failed:', error);
      throw error;
    }
  }
}
