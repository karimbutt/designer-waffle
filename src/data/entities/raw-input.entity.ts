import { INoteBase } from './note.entity';

export interface IRawInput extends IRawInputBase {
  id: string;
  outputText: INoteBase;
}

export interface IRawInputBase {
  contactId: string;
  inputText: string;
}
