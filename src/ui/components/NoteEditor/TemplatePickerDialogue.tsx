import { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { UsersIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../../utils/classNames';
import { LogWorkMeeting } from '../../../constants/note-templates/log-work-meeting';

interface NoteTemplate {
  name: string;
}

const templates: NoteTemplate[] = [LogWorkMeeting];

const recent = [templates[0]];

export const TemplatePicker = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(true);

  const filteredTemplates =
    query === ''
      ? []
      : templates.filter((template) => {
          return template.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox<NoteTemplate> onChange={(template) => null}>
                {({ activeOption }) => (
                  <>
                    <div className="relative">
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Combobox.Input
                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        onChange={(event) => setQuery(event.target.value)}
                        onBlur={() => setQuery('')}
                      />
                    </div>

                    {(query === '' || filteredTemplates.length > 0) && (
                      <Combobox.Options
                        as="div"
                        static
                        hold
                        className="flex transform-gpu divide-x divide-gray-100">
                        <div
                          className={classNames(
                            'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                            activeOption ? 'sm:h-96' : '',
                          )}>
                          {query === '' && (
                            <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">
                              Recent searches
                            </h2>
                          )}
                          <div className="-mx-2 text-sm text-gray-700">
                            {(query === '' ? recent : filteredTemplates).map((person) => (
                              <Combobox.Option
                                as="div"
                                key={person.name}
                                value={person}
                                className={({ active }) =>
                                  classNames(
                                    'flex cursor-default select-none items-center rounded-md p-2',
                                    active ? 'bg-gray-100 text-gray-900' : '',
                                  )
                                }>
                                {({ active }) => (
                                  <>
                                    <span className="ml-3 flex-auto truncate">{person.name}</span>
                                    {active && (
                                      <ChevronRightIcon
                                        className="ml-3 h-5 w-5 flex-none text-gray-400"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </div>
                        </div>

                        {activeOption && (
                          <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                            <div className="flex-none p-6 text-center">
                              <h2 className="mt-3 font-semibold text-gray-900">
                                {activeOption.name}
                              </h2>
                            </div>
                            <div className="flex flex-auto flex-col justify-between p-6"></div>
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
