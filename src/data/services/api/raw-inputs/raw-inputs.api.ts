import { IRawInput, IRawInputBase } from '../../../entities/raw-input.entity';
import AppApi from '../app-api';

export default class RawInputsApi {
  constructor(private api: AppApi) {}

  async createRawInput(rawInput: IRawInputBase) {
    try {
      const response = await this.api.client.post<IRawInput>('/raw-inputs', rawInput);
      return response.data;
    } catch (error) {
      console.error('Create note failed:', error);
      throw error;
    }
  }
}
