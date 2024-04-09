export interface IInteraction extends IInteractionBase {
  id: string;
}

export interface IInteractionBase {
  contactId: string;
  rawSummary: string;
  date: string;
}
