import { classNames } from '../../../utils/classNames';
import { Fragment } from 'react/jsx-runtime';
import { useAppContext } from '../../../context/app-context';
import { getContactInitials } from '../../../utils/getContactInitials';
import { useEffect, useState } from 'react';
import { NotesTab } from './NotesTab';
import { observer } from 'mobx-react-lite';
import { EllipsisHorizontalIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { Button } from '../shared/Button';

export const ContactDetailsSection = observer(() => {
  const { store } = useAppContext();
  const [activeTab, setActiveTab] = useState('notes');
  const navigate = useNavigate();

  const selectedContact = store.contacts.currentSelectedContact;

  useEffect(() => {
    const resetToNotes = async () => {
      setActiveTab('notes');
    };

    resetToNotes();
  }, [store.contacts.currentSelectedContact]);

  if (selectedContact) {
    return (
      <div className="bg-zinc-900 min-h-screen">
        <div className="text- p-2 pr-6  flex justify-end items-center shadow-sm ">
          <Button
            type="button"
            variant="muted-primary"
            className="px-0 pl-3 pr-1 focus:outline-none"
            onClick={() => navigate(ROUTES.CREATE_NOTE)}>
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="muted-primary"
            className="px-0 pl-3 pr-1 focus:outline-none">
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
        <main className="lg:pl-72">
          <div className="xl:pr-0">
            {/* Icon and name row */}
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <div className="flex flex-row">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-500">
                  <span className="text-xl font-medium leading-none text-white">
                    {getContactInitials(selectedContact)}
                  </span>
                </span>
                <div className="flex-1 text-md font-semibold leading-6 ml-4 text-white">
                  {selectedContact.firstName} {selectedContact.lastName}
                </div>
              </div>
              {/* Tabs row */}
              <div className="mt-4">
                <nav className="flex space-x-4 mb-4" aria-label="Tabs">
                  <button
                    key={'notes'}
                    onClick={() => setActiveTab('notes')}
                    className={classNames(
                      activeTab === 'notes'
                        ? 'border-indigo-400 text-white'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-400',
                      'whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium',
                    )}
                    aria-current={activeTab === 'notes' ? 'page' : undefined}>
                    Notes
                  </button>
                  <button
                    key={'timeline'}
                    onClick={() => setActiveTab('timeline')}
                    className={classNames(
                      activeTab === 'timeline'
                        ? 'border-indigo-400 text-white'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-400',
                      'whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium',
                    )}
                    aria-current={activeTab === 'timeline' ? 'page' : undefined}>
                    Timeline
                  </button>
                  <button
                    key={'details'}
                    onClick={() => setActiveTab('details')}
                    className={classNames(
                      activeTab === 'details'
                        ? 'border-indigo-400 text-white'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-400',
                      'whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium',
                    )}
                    aria-current={activeTab === 'details' ? 'page' : undefined}>
                    Details
                  </button>
                </nav>
                {activeTab == 'notes' && <NotesTab />}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    // TODO: Add a component for when this is loading the selected contact
    return <></>;
  }
});
