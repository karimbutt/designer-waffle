import { PartialBlock } from '@blocknote/core';

export type Category = 'Catching up';

type NoteTemplate = {
  name: string;
  title: string;
  body: PartialBlock[];
  category: Category;
  description: string;
};

// type NoteTemplate = {
//   name: string;
//   title: string;
//   body: string;
// };
