import { PlusIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { useAppContext } from '../../context/app-context';
import { IContact } from '../../data/entities/contact.entity';
import { observer } from 'mobx-react-lite';
import { groupAndSortContactsAlphabetically } from '../../utils/groupAndSortContactsAlphabetically';
import { Logo } from './shared/Logo';
import { Button } from './shared/Button';

interface SidebarProps {
  setOpenCreateContactDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = observer(({ setOpenCreateContactDialog }) => {
  const { store } = useAppContext();
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  const [alphabeticallyGroupedContacts, setAlphabeticallyGroupedContacts] = useState<
    Record<string, IContact[]> | undefined
  >();

  useEffect(() => {
    setAlphabeticallyGroupedContacts(groupAndSortContactsAlphabetically(store.contacts.contacts));
  }, [store.contacts.contacts]);

  if (!alphabeticallyGroupedContacts) {
    return <></>;
  }

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-dark-950">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-dark-900">
          <nav className="flex flex-1 flex-col">
            <div className="pb-3 pl-3 pt-1 flex flex-row items-center">
              <div className="flex flex-grow">
                <Logo height={'20px'} width={'115px'} />
              </div>
              <div className="flex justify-end ">
                <Button
                  type="button"
                  variant="muted-primary"
                  className="px-0 pl-3 pr-1 focus:outline-none"
                  onClick={() => setOpenCreateContactDialog(true)}>
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <ul role="list" className="flex flex-1 flex-col gap-y-7 px-1">
              <li>
                <nav className="h-full overflow-y-auto" aria-label="Directory">
                  {Object.keys(alphabeticallyGroupedContacts).map((letter) => (
                    <div key={letter} className="relative">
                      <div className="sticky top-0 z-10 border-b border-dark-900  py-0.5 text-sm font-semibold leading-6 text-brand-400 pl-3 mb-1 mt-2">
                        <h3 className="text-indigo-300">{letter}</h3>
                      </div>
                      <ul role="list">
                        {alphabeticallyGroupedContacts[letter].map((contact) => {
                          const isSelected =
                            store.contacts.currentSelectedContact?.id === contact.id;

                          return (
                            <button
                              className={`w-full focus:outline-none`}
                              onClick={(e) => {
                                e.preventDefault();
                                store.contacts.setCurrentSelectedContact(contact.id);
                              }}
                              key={contact.id}>
                              <li
                                className={`flex items-center rounded-md w-full gap-x-4 focus:outline-none py-2 px-2 ${
                                  isSelected
                                    ? store.ui.keyboardFocusArea === 'sidebar'
                                      ? 'bg-indigo-400 bg-opacity-60 text-white'
                                      : 'bg-stone-400 bg-opacity-60 text-white'
                                    : 'text-gray-400'
                                }`}>
                                <div className="min-w-0">
                                  <p className={`text-sm font-semibold leading-6`}>
                                    {contact.firstName} {contact.lastName}
                                  </p>
                                </div>
                              </li>
                            </button>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
});
