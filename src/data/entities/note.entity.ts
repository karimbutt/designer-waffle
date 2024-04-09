export interface INote extends INoteBase {
  id: string;
}

export interface INoteBase {
  contactId: string;
  textBody: string;
  interactionId?: string;
}
