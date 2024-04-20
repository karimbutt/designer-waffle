import { Menu, Transition } from '@headlessui/react';
import { classNames } from '../../../utils/classNames';
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react/jsx-runtime';
import { useAppContext } from '../../../context/app-context';
import { getContactInitials } from '../../../utils/getContactInitials';
import { useEffect, useState } from 'react';
import { NotesTab } from './NotesTab';
import { ProfileDetailsTab } from './ProfileDetailsTab';

const tabs = [
  { name: 'Timeline', component: NotesTab },
  { name: 'About', component: ProfileDetailsTab }
];

interface Project {
  id: number;
  name: string;
  href: string;
  status: string;
  createdBy: string;
  dueDate: string;
  dueDateTime: string;
}

interface ContactDetailsSectionProps {
  selectedContactId: string | undefined;
}

export const ContactDetailsSection = ({ selectedContactId }: ContactDetailsSectionProps) => {
  const { api, store } = useAppContext();
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const renderTabComponent = () => {
    const tab = tabs.find((tab) => tab.name === activeTab);
    if (tab && tab.component) {
      const Component = tab.component;
      return <Component />;
    }
    return null;
  };

  const selectedContact = selectedContactId
    ? store.contactStore.contactsById.get(selectedContactId)
    : null;
  if (selectedContact) {
    return (
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
              {/* Search bar */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search..."
                />
              </div>
            </div>
            {/* Tabs row */}
            <div className="mt-4">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={classNames(
                      activeTab === tab.name
                        ? 'bg-gray-100 text-gray-700'
                        : 'text-gray-500 hover:text-gray-700',
                      'rounded-md px-3 py-2 text-sm font-medium'
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
      </main>
    );
  } else {
    return <></>;
  }
};
