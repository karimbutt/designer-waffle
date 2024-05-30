import { Fragment, useState, useEffect, useRef } from 'react';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { UsersIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../../../utils/classNames';
import { StandardDialog } from '../../shared/StandardDialog';
import { NoteTemplate, Category } from '../../../../constants/note-templates/note-template.type';
import { Button } from '../../shared/Button';
import { AllTemplates } from '../../../../constants/note-templates/note-templates';
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react';
import './styles.css';
import { templatePreviewTheme } from './template-preview-theme';
import { Text } from '../../shared/Text';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  applyTemplate: (template: NoteTemplate) => void;
}

const categoryOrder: Category[] = ['Catching up'];

export const TemplatePicker = ({ open, setOpen, applyTemplate }: Props) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);
  const [editorInitialized, setEditorInitialized] = useState<boolean>(false);
  const [filteredTemplates, setFilteredTemplates] = useState<NoteTemplate[]>(AllTemplates);
  // const [currTemplate, setCurrTemplate] = useState<NoteTemplate>(AllTemplates[0]);

  const editor = useCreateBlockNote({
    initialContent: AllTemplates[0].body,
  });

  useEffect(() => {
    if (editor && !editorInitialized) {
      setEditorInitialized(true);
    }
  }, [editor]);

  // Focus the input field when the dialog is opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Reset activeTemplateIndex when the dialog closes with a delay because the dialogue has animation
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setActiveTemplateIndex(0);
        setQuery('');
      }, 300); // Adjust the delay to match the closing animation duration
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    async function updateBlocks() {
      const currTemplate = filteredTemplates[activeTemplateIndex];
      if (editorInitialized && filteredTemplates.length > 0) {
        // Use setTimeout to delay the invocation of replaceBlocks
        // This delay ensures that the editor is fully initialized before the method is called
        // It addresses an issue during hot-reload in development mode where the editor
        // might not be ready immediately, causing an error: "Cannot read properties of undefined (reading 'dispatch')"
        setTimeout(() => {
          editor.replaceBlocks(editor.document, currTemplate.body);
        }, 0);
      }
    }
    updateBlocks();
  }, [activeTemplateIndex, filteredTemplates]);

  useEffect(() => {
    const filtered =
      query === ''
        ? AllTemplates
        : AllTemplates.filter((template) => {
            return template.name.toLowerCase().includes(query.toLowerCase());
          });
    setFilteredTemplates(filtered);

    if (filteredTemplates.length > 0) {
      setActiveTemplateIndex(0);
    }
  }, [query]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveTemplateIndex((prevIndex) => (prevIndex + 1) % filteredTemplates.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveTemplateIndex(
        (prevIndex) => (prevIndex - 1 + filteredTemplates.length) % filteredTemplates.length,
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      applyTemplate(filteredTemplates[activeTemplateIndex]);
      setOpen(false);
    }
  };

  const currTemplate = filteredTemplates[activeTemplateIndex];

  const groupedTemplates: Record<Category, NoteTemplate[]> = filteredTemplates.reduce(
    (acc, template) => {
      const category = template.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(template);
      return acc;
    },
    {} as Record<Category, NoteTemplate[]>,
  );

  // Sort categories based on the defined order
  const sortedCategories = categoryOrder.filter((category) => groupedTemplates[category]);

  return (
    <StandardDialog open={open} setOpen={setOpen} size="xl">
      <Combobox<NoteTemplate>
        value={currTemplate}
        onChange={(template) => {
          const index = filteredTemplates.findIndex((t) => t.name === template.name);
          setActiveTemplateIndex(index);
        }}>
        {() => (
          <>
            <div className="relative">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-200"
                aria-hidden="true"
              />
              <Combobox.Input
                ref={inputRef}
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-200 placeholder:text-gray-300 sm:text-sm focus:outline-none focus:ring-0"
                placeholder="Search templates..."
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => setQuery('')}
                onKeyDown={handleKeyDown}
              />
            </div>

            {(query === '' || filteredTemplates.length > 0) && (
              <Combobox.Options
                as="div"
                static
                hold
                className="flex h-full transform-gpu divide-x divide-dark-900">
                <div
                  className={classNames(
                    'h-full min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-1',
                    filteredTemplates.length > 0 ? 'sm:h-96' : '',
                  )}>
                  <div className="-mx-2 text-sm ">
                    {sortedCategories.map((category) => (
                      <Fragment key={category}>
                        <div className="mb-1 mt-2 font-semibold text-gray-400">{category}</div>
                        {groupedTemplates[category].map((template) => (
                          <Combobox.Option
                            as="div"
                            key={template.name}
                            value={template}
                            className={({ active }) =>
                              classNames(
                                'flex cursor-default select-none items-center rounded-md p-2',
                                filteredTemplates.indexOf(template) === activeTemplateIndex
                                  ? 'bg-indigo-400 bg-opacity-60 text-white'
                                  : 'text-gray-400',
                              )
                            }>
                            <span className="ml-3 flex-auto truncate">{template.name}</span>
                            {filteredTemplates.indexOf(template) === activeTemplateIndex && (
                              <ChevronRightIcon
                                className="ml-3 h-5 w-5 flex-none text-white"
                                aria-hidden="true"
                              />
                            )}
                          </Combobox.Option>
                        ))}
                      </Fragment>
                    ))}
                  </div>
                </div>

                {filteredTemplates.length > 0 && (
                  <div className="hidden h-full p-2 w-3/5 flex-none flex-col overflow-y-auto sm:flex relative">
                    <div className="bg-zinc-800 h-full rounded-md py-5">
                      <BlockNoteView
                        editor={editor}
                        editable={false}
                        theme={templatePreviewTheme}
                        data-template-view
                      />
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 p-4">
                      <div className="bg-dark-900 rounded-lg shadow-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Text type="heading3" className="flex-1">
                            {currTemplate.name}
                          </Text>
                          <Button
                            type="button"
                            variant="primary"
                            onClick={() => {
                              applyTemplate(filteredTemplates[activeTemplateIndex]);
                              setOpen(false);
                            }}
                            className="ml-4">
                            Use template
                          </Button>
                        </div>
                        <div>
                          <Text type="mini">{currTemplate.description}</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Combobox.Options>
            )}

            {query !== '' && filteredTemplates.length === 0 && (
              <div className="px-6 py-14 text-center text-sm sm:px-14">
                <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                <p className="mt-4 font-semibold text-gray-900">No templates found</p>
                <p className="mt-2 text-gray-500">
                  We couldn’t find anything with that term. Please try again.
                </p>
              </div>
            )}
          </>
        )}
      </Combobox>
    </StandardDialog>
  );
};

{
  /* <div className="flex flex-grow">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                          applyTemplate(filteredTemplates[activeTemplateIndex]);
                          setOpen(false);
                        }}>
                        Apply Template
                      </Button>
                    </div> */
}
