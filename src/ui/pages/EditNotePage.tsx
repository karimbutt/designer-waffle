import { useNavigate, useParams } from 'react-router-dom';
import { NoteEditor } from '../components/NoteEditor/NoteEditor';
import { useAppContext } from '../../context/app-context';
import { useState } from 'react';
import SimpleAlertDialog from '../components/shared/SimpleAlertDialog';
import { PartialBlock } from '@blocknote/core';

export const EditNotePage = () => {
  const { noteId } = useParams<'noteId'>();
  const { api, store } = useAppContext();
  const [deleteNoteConfirmationOpen, setDeleteNoteConfirmationOpen] = useState(false);
  const navigate = useNavigate();

  // For Typescript
  if (!noteId) {
    return <></>;
  }

  const note = store.notes.byId.get(noteId);

  // For Typescript
  if (!note) {
    return <></>;
  }

  const onSave = async (title: string, body: PartialBlock[]) => {
    const titleForSave = title.trim().length > 0 ? title : 'Untitled';

    await api.notes.updateNote(noteId, {
      body: body,
      title: titleForSave,
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  const deleteNote = async (id: string) => {
    try {
      await api.notes.deleteNote(id);
      setDeleteNoteConfirmationOpen(false);
      // setFocusedNoteId(null);
      goBack();
    } catch {
      // TODO: placeholder
    }
  };

  const headerText = `Edit note about ${note.contact?.firstName} ${note.contact?.lastName}`;

  return (
    <>
      <NoteEditor
        title={note.title}
        body={note.body}
        headerText={headerText}
        onSave={onSave}
        onTrashClick={() => setDeleteNoteConfirmationOpen(true)}
      />
      <SimpleAlertDialog
        isOpen={deleteNoteConfirmationOpen}
        setIsOpen={setDeleteNoteConfirmationOpen}
        title="Delete note?"
        bodyText="Are you sure that you want to delete this note?"
        mainButtonOnClick={() => deleteNote(noteId)}
        mainButtonText="Delete"
      />
    </>
  );
};
