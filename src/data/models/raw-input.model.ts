import { INoteBase } from '../entities/note.entity';
import { IRawInput } from '../entities/raw-input.entity';

export default class RawInput implements IRawInput {
  id: string;
  outputText: INoteBase;
  contactId: string;
  inputText: string;

  constructor(rawInput: IRawInput) {
    this.id = rawInput.id;
    this.outputText = rawInput.outputText;
    this.contactId = rawInput.contactId;
    this.inputText = rawInput.inputText;
  }
}
