import { classNames } from '../../../utils/classNames';
import { Fragment } from 'react/jsx-runtime';
import { useAppContext } from '../../../context/app-context';
import { getContactInitials } from '../../../utils/getContactInitials';
import { useState } from 'react';
import { Timeline } from './Timeline';
import { observer } from 'mobx-react-lite';
// import { RawInputDialogue } from './RawInputDialogue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { IconButton } from '../IconButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routes';
import { useHotkeys } from 'react-hotkeys-hook';

const tabs = [{ name: 'Timeline', component: Timeline }];

export const ContactDetailsSection = observer(() => {
  const { store } = useAppContext();
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [openRawInputDialogue, setOpenRawInputDialogue] = useState(false);
  const navigate = useNavigate();

  const renderTabComponent = () => {
    const tab = tabs.find((tab) => tab.name === activeTab);
    if (tab && tab.component) {
      const Component = tab.component;
      return <Component />;
    }
    return null;
  };

  useHotkeys(
    'c',
    () => {
      navigate(ROUTES.CREATE_NOTE);
    },
    [navigate],
  );

  const handleButtonClick = () => {
    setOpenRawInputDialogue(true);
  };

  const selectedContact = store.contactStore.currentSelectedContact;

  if (selectedContact) {
    return (
      <Fragment>
        <div className="text- p-4 flex justify-end items-center">
          <IconButton variant="primary" onClick={() => navigate(ROUTES.CREATE_NOTE)}>
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
          </IconButton>
          <IconButton variant="brand" onClick={() => null}>
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </IconButton>
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
                <div className="flex-1 text-sm font-semibold leading-6 ml-4 text-gray-900">
                  {selectedContact.firstName} {selectedContact.lastName}
                </div>
              </div>
              {/* Tabs row */}
              <div className="mt-4">
                <nav className="flex space-x-4 mb-4" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={classNames(
                        activeTab === tab.name
                          ? 'bg-gray-100 text-gray-700'
                          : 'text-gray-500 hover:text-gray-700',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                      aria-current={activeTab === tab.name ? 'page' : undefined}>
                      {tab.name}
                    </button>
                  ))}
                </nav>
                {renderTabComponent()}
              </div>
            </div>
          </div>
          {/* <RawInputDialogue open={openRawInputDialogue} setOpen={setOpenRawInputDialogue} /> */}
          <button
            onClick={handleButtonClick}
            className="fixed bottom-10 right-10 flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white text-lg shadow-lg hover:bg-blue-700 transition duration-300"
            aria-label="Assistant">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                fill="currentColor"
              />
            </svg>
          </button>
        </main>
      </Fragment>
    );
  } else {
    // TODO: Add a component for when this is laoding the selected contact
    return <></>;
  }
});
