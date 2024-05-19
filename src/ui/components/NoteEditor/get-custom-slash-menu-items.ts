import { BlockNoteEditor } from '@blocknote/core';
import { DefaultReactSuggestionItem, getDefaultReactSlashMenuItems } from '@blocknote/react';

// Function to filter out the image option
export const getCustomSlashMenuItems = (editor: BlockNoteEditor): DefaultReactSuggestionItem[] => {
  // Get the default slash menu items
  const defaultItems = getDefaultReactSlashMenuItems(editor);
  // Filter out the image item
  return defaultItems.filter((item) => item.title !== 'Image');
};
