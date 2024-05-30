import React, { useState } from 'react';
import { useAppContext } from '../../../context/app-context';
import { observer } from 'mobx-react-lite';
import Markdown from 'react-markdown';
import { EmptyNoteState } from './EmptyNoteState';
import { TrashIcon } from '@heroicons/react/24/outline';
import SimpleAlertDialog from '../shared/SimpleAlertDialog';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { Text } from '../shared/Text';
import { useCreateBlockNote } from '@blocknote/react';
import { Note } from './Note';

export const NotesTab = observer(() => {
  const { api, store } = useAppContext();
  const [deleteNoteConfirmationOpen, setDeleteNoteConfirmationOpen] = useState(false);
  const [focusedNoteId, setFocusedNoteId] = useState<string | null>(null);
  const navigate = useNavigate();

  const deleteNote = async (id: string) => {
    try {
      await api.notes.deleteNote(id);
      setDeleteNoteConfirmationOpen(false);
      setFocusedNoteId(null);
    } catch {
      // TODO: placeholder
    }
  };
  const onNoteClick = (noteId: string) => {
    navigate(`${ROUTES.NOTES}/${noteId}/edit`);
  };

  const openNoteDeletionConfirmation = (noteId: string): void => {
    setFocusedNoteId(noteId);
    setDeleteNoteConfirmationOpen(true);
  };

  const currentSelectedContact = store.contacts.currentSelectedContact;

  const notes = currentSelectedContact?.notes.sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
  );

  if (!currentSelectedContact) {
    return <></>;
  }

  if (!notes || notes.length == 0) {
    return (
      <div className="mt-2">
        <EmptyNoteState
          message={`Create a new note about ${currentSelectedContact.firstName} ${currentSelectedContact.lastName}`}
        />
      </div>
    );
  }

  if (!currentSelectedContact) {
    return <></>;
  }

  const currentSelectedNoteId = currentSelectedContact.currentSelectedNoteId;

  return (
    <div>
      <ol>
        {notes.map((note) => {
          const noteIsSelected = (currentSelectedContact && currentSelectedNoteId) == note.id;
          const noteIsFocused = noteIsSelected && store.ui.keyboardFocusArea == 'main';

          return (
            <Note
              key={note.id}
              note={note}
              isSelected={noteIsSelected}
              isInFocus={noteIsFocused}
              onClick={onNoteClick}
              onDelete={openNoteDeletionConfirmation}
            />
          );
          // return (
          //   <li
          //     key={note.id}
          //     onClick={() => navigate(`${ROUTES.NOTES}/${note.id}/edit`)}
          //     className={`group mb-2 border rounded-md pt-2 pb-2 pl-3 pr-3 relative shadow-lg cursor-pointer min-h-28 ${
          //       noteIsSelected
          //         ? noteIsFocused
          //           ? 'border-indigo-300 hover:border-indigo-200 border-2'
          //           : 'border-stone-200 hover:border-stone-100'
          //         : 'border-stone-600 hover:border-stone-400'
          //     }`}>
          //     <Text type="mini" className=" text-stone-400">
          //       {format(new Date(note.updatedAt), "MMM dd, yyyy 'at' hh:mma")}
          //     </Text>
          //     <h1 className="text-large font-semibold text-gray-200">{note.title}</h1>
          //     <Markdown
          //       components={{
          //         h1: (props) => {
          //           const { ...rest } = props;
          //           return <Text type="small" className="text-gray-200" {...rest} />;
          //         },
          //         h2: (props) => {
          //           const { ...rest } = props;
          //           return <Text type="small" className="text-gray-200" {...rest} />;
          //         },
          //         h3: (props) => {
          //           const { ...rest } = props;
          //           return <Text type="small" className="text-gray-200" {...rest} />;
          //         },
          //         p: (props) => {
          //           const { ...rest } = props;
          //           return <Text type="small" className="text-gray-200" {...rest} />;
          //         },
          //         li: (props) => {
          //           const { ...rest } = props;
          //           return (
          //             <li
          //               className="text-small font-normal text-gray-200 pl-1 list-disc ml-5 my-1"
          //               {...rest}
          //             />
          //           );
          //         },
          //       }}>
          //       {notePreview}
          //     </Markdown>
          //     <div
          //       className={`absolute right-2 bottom-2 flex opacity-0 group-hover:opacity-100 ${noteIsFocused ? 'opacity-100' : ''}`}>
          //       <button
          //         className="p-1"
          //         onClick={(e) => {
          //           e.stopPropagation();
          //           openNoteDeletionConfirmation(note.id);
          //         }}>
          //         <TrashIcon className="h-4 w-4 text-red-400 hover:text-red-300" />
          //       </button>
          //     </div>
          //   </li>
          // );
        })}
      </ol>
      <SimpleAlertDialog
        isOpen={deleteNoteConfirmationOpen}
        setIsOpen={setDeleteNoteConfirmationOpen}
        title="Delete note?"
        bodyText="Are you sure that you want to delete this note?"
        mainButtonOnClick={() => {
          if (focusedNoteId) {
            deleteNote(focusedNoteId);
          }
        }}
        mainButtonText="Delete"
      />
    </div>
  );
});
