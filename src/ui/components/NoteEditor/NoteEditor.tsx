import '@blocknote/core/fonts/inter.css';
import {
  BlockNoteView,
  useCreateBlockNote,
  SideMenu,
  DragHandleMenu,
  RemoveBlockItem,
  SideMenuController,
  SuggestionMenuController,
} from '@blocknote/react';
import '@blocknote/react/style.css';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../shared/Button';
import SimpleAlertDialog from '../shared/SimpleAlertDialog';
import { Text } from '../shared/Text';
import './styles.css';
import CustomToolbar from './CustomToolbar';
import { BlockNoteEditor, filterSuggestionItems } from '@blocknote/core';
import { modifiedDarkTheme } from './modified-dark-theme';
import { getCustomSlashMenuItems } from './get-custom-slash-menu-items';
import { LogWorkMeeting } from '../../../constants/note-templates/log-work-meeting';

interface Props {
  title?: string;
  markdownBody?: string;
  headerText: string;
  onSave: (title: string, body: string) => Promise<void>;
  initialFieldFocused?: boolean;
  onTrashClick?: () => void;
  applyTemplate?: (template: NoteTemplate) => void;
}

export const NoteEditor = ({
  title,
  markdownBody,
  headerText,
  onSave,
  initialFieldFocused,
  onTrashClick,
  applyTemplate,
}: Props) => {
  const editor = useCreateBlockNote();
  const navigate = useNavigate();
  const [noteTitle, setNoteTitle] = useState<string>(title || '');
  const [saveWarningDialogueOpen, setSaveWarningDialogueOpen] = useState<boolean>(false);
  const [formWasChanged, setFormWasChanged] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function loadInitialBlocks() {
      if (markdownBody) {
        const blocks = await editor.tryParseMarkdownToBlocks(markdownBody);
        editor.replaceBlocks(editor.document, blocks);
        // Need to set this here because of the save warning that comes up. This triggers onChange
        // which then triggers the save warning if the user exits out. A bit of a hack.
        setFormWasChanged(false);
      }
    }
    loadInitialBlocks();
  }, [editor, markdownBody]);

  useEffect(() => {
    async function loadInitialTitle() {
      if (title) {
        setNoteTitle(title);
        // Need to set this here because of the save warning that comes up. This triggers onChange
        // which then triggers the save warning if the user exits out. A bit of a hack.
        setFormWasChanged(false);
      }
    }
    loadInitialTitle();
  }, [title]);

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

  // We don't use hotkeys here because for some reason it was never triggering when in the editor.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        saveNoteAndGoBack();
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [saveNoteAndGoBack]);

  // Focuses the title field so that the user can just start typing right away when creating a new note (but not on edit)
  useEffect(() => {
    if (initialFieldFocused) {
      // Timeout used in order to not have the keystroke to get to this page be included in the input field
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // Delay focus by 100 milliseconds

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, []);

  const saveNote = async () => {
    const blocks = editor.document;
    const markdownFromBlocks = await editor.blocksToMarkdownLossy(blocks);

    await onSave(noteTitle, markdownFromBlocks);
  };

  const warnAndGoBack = () => {
    if (formWasChanged) {
      setSaveWarningDialogueOpen(true);
    } else {
      goBack();
    }
  };

  const handleNoteTitleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setNoteTitle(target.value);
    setFormWasChanged(true);
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <main className="px-12 flex flex-row">
      <div className="mt-10 flex-shrink">
        <button
          type="button"
          onClick={() => warnAndGoBack()}
          className="rounded-full bg-neutral-600 p-2 text-text-muted hover:text-text-secondary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <ArrowLeftIcon className="h-7 w-7" aria-hidden="true" />
        </button>
      </div>
      <div className="px-44 flex-grow">
        <div className="bg-zinc-900 p-10 h-screen">
          <Text type="heading2" className="text-neutral-300 mb-2">
            {headerText}
          </Text>
          <div className="bg-neutral-600 rounded-md py-7 shadow-lg">
            <div className="w-full mb-4 px-12">
              <textarea
                ref={inputRef}
                value={noteTitle}
                onChange={(e) => handleNoteTitleInput(e)}
                placeholder="Title"
                rows={1}
                className="resize-none w-full bg-neutral-600 focus:outline-none focus:ring-0 placeholder-text-muted caret-white text-text-primary text-heading2"
              />
            </div>
            <div className="mb-5 min-h-72">
              {/* TODO: move this blocknote view into a separate component */}
              <BlockNoteView
                editor={editor}
                formattingToolbar={false}
                sideMenu={false}
                slashMenu={false}
                theme={modifiedDarkTheme}
                onChange={() => setFormWasChanged(true)}
                data-custom-editor>
                <CustomToolbar />
                <SuggestionMenuController
                  triggerCharacter={'/'}
                  // Replaces the default Slash Menu items with our custom ones.
                  getItems={async (query) =>
                    filterSuggestionItems(getCustomSlashMenuItems(editor), query)
                  }
                />
                <SideMenuController
                  sideMenu={(props) => (
                    <SideMenu
                      {...props}
                      dragHandleMenu={(props) => (
                        <DragHandleMenu {...props}>
                          <RemoveBlockItem {...props}>Delete</RemoveBlockItem>
                        </DragHandleMenu>
                      )}
                    />
                  )}
                />
              </BlockNoteView>
            </div>
            <div
              className="border-t pt-3 mx-12 border-border-primary flex flex-row"
              style={{ borderTopWidth: '0.5px' }}>
              <div className="flex flex-1">
                <Button type="button" variant="muted-primary" onClick={() => saveNoteAndGoBack()}>
                  Save
                </Button>

                {applyTemplate && (
                  <Button
                    type="button"
                    variant="muted-primary"
                    onClick={() => applyTemplate(LogWorkMeeting)}>
                    Apply Template
                  </Button>
                )}
              </div>
              <Button
                className="flex"
                type="button"
                variant="muted-secondary"
                onClick={() => (onTrashClick ? onTrashClick() : warnAndGoBack())}>
                <TrashIcon className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
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
