export const getFirstTwoNoteLines = (markdown: string): string => {
  const lines = markdown.split('\n');
  return lines.slice(0, 3).join('\n');
};
