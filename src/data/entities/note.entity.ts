export interface INote extends INoteBase {
  id: string;
}

export interface INoteBase {
  contactId: string;
  title: string;
  body: string;
}
