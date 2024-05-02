import '@blocknote/core/fonts/inter.css';
import { BlockNoteView, useCreateBlockNote, darkDefaultTheme, Theme } from '@blocknote/react';
import '@blocknote/react/style.css';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../context/app-context';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/Button';
import { colors } from '../../utils/colors';
import SimpleAlertDialog from '../components/SimpleAlertDialog';

const modifiedDarkTheme = {
  ...darkDefaultTheme,
  colors: {
    ...darkDefaultTheme.colors,
    editor: {
      text: '#ffffff',
      background: colors.dark.tertiary,
    },
    sideMenu: '#ffffff',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;

export const CreateNotePage = () => {
  const editor = useCreateBlockNote();
  const navigate = useNavigate();
  const { api, store } = useAppContext();
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [saveWarningDialogueOpen, setSaveWarningDialogueOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // const goBack = useCallback(() => {
  //   navigate(-1);
  // }, [noteTitle, navigate, editor.document]);

  const goBack = () => {
    navigate(-1);
  };

  useHotkeys(
    'esc',
    (e) => {
      e.preventDefault();
      warnAndGoBack();
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      enabled: !saveWarningDialogueOpen,
    },
    [noteTitle, navigate, editor.document],
  );

  const saveNoteAndGoBack = async () => {
    await saveNote();
    goBack();
  };

  // useHotkeys('meta+enter', saveNoteAndGoBack, [saveNoteAndGoBack]);
  // useHotkeys(
  //   'meta+s',
  //   (event) => {
  //     event.preventDefault(); // Prevent the default save dialog in browsers
  //     saveNoteAndGoBack();
  //   },
  //   {
  //     preventDefault: true,
  //     enabled: () => false,
  //     enableOnFormTags: true,
  //     enableOnContentEditable: true,
  //   },
  //   [saveNoteAndGoBack],
  // );

  useEffect(() => {
    // Timeout used in order to not have the keystroke to get to this page be included in the input field
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100); // Delay focus by 100 milliseconds

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const saveNote = async () => {
    const blocks = editor.document;
    const markdownFromBlocks = await editor.blocksToMarkdownLossy(blocks);

    const currentContact = store.contactStore.currentSelectedContact;

    const titleForSave = noteTitle.trim.length > 0 ? noteTitle : 'Untitled';

    if (currentContact) {
      await api.notes.createNote({
        contactId: currentContact.id,
        body: markdownFromBlocks,
        title: titleForSave,
      });
    }
  };

  const warnAndGoBack = () => {
    const formIsEmpty = checkIsFormEmpty();

    if (!formIsEmpty) {
      setSaveWarningDialogueOpen(true);
    } else {
      goBack();
    }
  };

  const checkIsFormEmpty = (): boolean => {
    const blocks = editor.document;

    return (
      noteTitle.trim().length == 0 &&
      blocks.length == 1 &&
      blocks[0].type == 'paragraph' &&
      blocks[0].content.length == 0
    );
  };

  const handleNoteTitleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setNoteTitle(target.value);
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <main className="lg:px-60">
      <div className="bg-dark-secondary p-10 h-screen">
        <div className="bg-dark-tertiary rounded-md py-7 shadow-lg">
          <div className="w-full mb-4 px-12">
            <textarea
              ref={inputRef}
              value={noteTitle}
              onChange={(e) => handleNoteTitleInput(e)}
              placeholder="Title"
              rows={1}
              className="resize-none w-full bg-dark-tertiary focus:outline-none focus:ring-0 placeholder-text-muted caret-white text-text-primary text-heading2"
            />
          </div>
          <div className="mb-5 min-h-72">
            <BlockNoteView
              // contentEditable={true}
              editor={editor}
              formattingToolbar={true}
              theme={modifiedDarkTheme}
            />
          </div>
          <div
            className="border-t pt-3 mx-12 border-border-primary flex flex-row"
            style={{ borderTopWidth: '0.5px' }}>
            <div className="flex flex-1">
              <Button type="button" variant="muted-primary" onClick={() => saveNoteAndGoBack()}>
                Save
              </Button>
            </div>
            <Button
              className="flex"
              type="button"
              variant="muted-secondary"
              onClick={() => goBack()}>
              <TrashIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      <SimpleAlertDialog
        isOpen={saveWarningDialogueOpen}
        setIsOpen={setSaveWarningDialogueOpen}
        title={'Save note?'}
        bodyText="Would you like to save this note?"
        mainButtonOnClick={saveNoteAndGoBack}
        mainButtonText="Save"
        secondaryButtonOnClick={goBack}
        secondaryButtonText="Discard"
      />
    </main>
  );
};
