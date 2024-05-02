import { Dialog, Transition } from '@headlessui/react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { useAppContext } from '../../context/app-context';
import { IContact } from '../../data/entities/contact.entity';
import { observer } from 'mobx-react-lite';
import { getContactInitials } from '../../utils/getContactInitials';
import { groupAndSortContactsAlphabetically } from '../../utils/groupAndSortContactsAlphabetically';
import { Logo } from './Logo';
import { IconButton } from './IconButton';

interface SidebarProps {
  setOpenCreateContactDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = observer(({ setOpenCreateContactDialog }) => {
  const { api, store } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alphabeticallyGroupedContacts, setAlphabeticallyGroupedContacts] = useState<
    Record<string, IContact[]> | undefined
  >();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await api.contacts.getAllContacts();
        const contacts = store.contactStore.contacts;
        if (contacts.length > 0) {
          store.contactStore.loadCurrentSelectedContact(store.contactStore.contacts[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    setAlphabeticallyGroupedContacts(
      groupAndSortContactsAlphabetically(store.contactStore.contacts),
    );
  }, [store.contactStore.contacts]);

  if (!alphabeticallyGroupedContacts) {
    return <></>;
  }

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-9 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-dark-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 bg-dark-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute top-0 left-full flex justify-center w-16 pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-dark-800 px-6 pb-2">
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1 text-white">
                          {store.contactStore.contacts.map((contact) => (
                            <li key={contact.id}>{contact.firstName}</li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-accent-300">
                          Your teams
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-dark-950">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-dark-900 px-3">
          <nav className="flex flex-1 flex-col">
            <div className="pb-3 pt-1 flex flex-row items-center">
              <div className="flex flex-grow">
                <Logo height={'20px'} width={'115px'} />
              </div>
              <div className="flex justify-end">
                <IconButton variant="brand" onClick={() => setOpenCreateContactDialog(true)}>
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </IconButton>
              </div>
            </div>
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <nav className="h-full overflow-y-auto" aria-label="Directory">
                  {Object.keys(alphabeticallyGroupedContacts).map((letter) => (
                    <div key={letter} className="relative">
                      <div className="sticky top-0 z-10 border-b border-dark-900 px-3 py-1 text-sm font-semibold leading-6 text-brand-400">
                        <h3>{letter}</h3>
                      </div>
                      <ul role="list" className="divide-y divide-dark-500">
                        {alphabeticallyGroupedContacts[letter].map((contact) => (
                          <button
                            onClick={() => store.contactStore.loadCurrentSelectedContact(contact)}
                            key={contact.id}>
                            <li className="flex gap-x-4 px-3 py-3">
                              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-dark-600">
                                <span className="text-sm font-medium leading-none text-white">
                                  {getContactInitials(contact)}
                                </span>
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold leading-6 text-white">
                                  {contact.firstName} {contact.lastName}
                                </p>
                              </div>
                            </li>
                          </button>
                        ))}
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
