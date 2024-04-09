import { observable, makeAutoObservable } from 'mobx';
import RootStore from './root.store';
import { IInteraction } from '../entities/interaction.entity';

export default class InteractionStore {
  interactionsById = observable.map<string, IInteraction>();

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  loadInteractions(interactions: IInteraction[]) {
    interactions.forEach((interaction) => {
      this.loadInteraction(interaction.id, interaction);
    });
  }

  loadInteraction(interactionId: string, interaction: IInteraction) {
    this.interactionsById.set(interactionId, interaction);
  }

  updateInteraction(interactionId: string, updatedInteraction: Partial<IInteraction>) {
    const existingInteraction = this.interactionsById.get(interactionId);
    if (existingInteraction) {
      this.interactionsById.set(interactionId, { ...existingInteraction, ...updatedInteraction });
    }
  }

  deleteInteraction(interactionId: string) {
    this.interactionsById.delete(interactionId);
  }

  get interactions() {
    return Array.from(this.interactionsById.values());
  }
}
