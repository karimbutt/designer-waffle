import { PartialBlock } from '@blocknote/core';

export interface INote extends INoteBase {
  id: string;
  updatedAt: Date;
}

export interface INoteBase {
  contactId: string;
  title: string;
  body?: PartialBlock[];
}
