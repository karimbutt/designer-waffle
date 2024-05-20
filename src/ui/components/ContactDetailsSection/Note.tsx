import Markdown from 'react-markdown';
import { INote } from '../../../data/entities/note.entity';
import { Text } from '../shared/Text';
import { TrashIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { getFirstTwoNoteLines } from '../../../utils/getFirstTwoLinesFromMarkdown';
import { Block } from '@blocknote/core';

interface Props {
  note: INote;
  isSelected: boolean;
  isInFocus: boolean;
  onClick: (noteId: string) => void;
  onDelete: (noteId: string) => void;
}

export const Note = ({ note, isSelected, isInFocus, onClick, onDelete }: Props) => {
  const [notePreview, setNotePreview] = useState<string>('');
  const blocknote = useCreateBlockNote();

  useEffect(() => {
    const createNotePreview = async () => {
      if (note.body) {
        const markdown = await blocknote.blocksToMarkdownLossy(note.body as Block[]);

        const previewString = getFirstTwoNoteLines(markdown);

        setNotePreview(previewString);
      }
    };

    createNotePreview();
  }, [note]);

  return (
    <li
      key={note.id}
      onClick={() => onClick(note.id)}
      className={`group mb-2 border rounded-md pt-2 pb-2 pl-3 pr-3 relative shadow-lg cursor-pointer min-h-28 ${
        isSelected
          ? isInFocus
            ? 'border-indigo-300 hover:border-indigo-200 border-2'
            : 'border-stone-200 hover:border-stone-100'
          : 'border-stone-600 hover:border-stone-400'
      }`}>
      <Text type="mini" className=" text-stone-400">
        {format(new Date(note.updatedAt), "MMM dd, yyyy 'at' hh:mma")}
      </Text>
      <h1 className="text-large font-semibold text-gray-200">{note.title}</h1>
      <Markdown
        components={{
          h1: (props) => {
            const { ...rest } = props;
            return <Text type="small" className="text-gray-200" {...rest} />;
          },
          h2: (props) => {
            const { ...rest } = props;
            return <Text type="small" className="text-gray-200" {...rest} />;
          },
          h3: (props) => {
            const { ...rest } = props;
            return <Text type="small" className="text-gray-200" {...rest} />;
          },
          p: (props) => {
            const { ...rest } = props;
            return <Text type="small" className="text-gray-200" {...rest} />;
          },
          li: (props) => {
            const { ...rest } = props;
            return (
              <li
                className="text-small font-normal text-gray-200 pl-1 list-disc ml-5 my-1"
                {...rest}
              />
            );
          },
        }}>
        {notePreview}
      </Markdown>
      <div
        className={`absolute right-2 bottom-2 flex opacity-0 group-hover:opacity-100 ${isInFocus ? 'opacity-100' : ''}`}>
        <button
          className="p-1"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}>
          <TrashIcon className="h-4 w-4 text-red-400 hover:text-red-300" />
        </button>
      </div>
    </li>
  );
};
