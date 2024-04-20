import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../../context/app-context';
import { Sidebar } from '../components/Sidebar';
import { classNames } from '../../utils/classNames';
import { CreateContactDialog } from '../components/CreateContactDialog/CreateContactDialog';
import { IContact } from '../../data/entities/contact.entity';
import { ContactDetailsSection } from '../components/ContactDetailsSection/ContactDetailsSection';

interface Event {
  id: string;
  title: string;
  description: string;
  datetime: string;
}

const contactEvents: Event[] = [
  {
    id: '1',
    title: 'Karim / Maks',
    description: 'Catching up 1:1',
    datetime: 'April 15th, 2024'
  },
  {
    id: '2',
    title: `Karim's Birthday`,
    description: '',
    datetime: 'April 5th, 2024'
  },
  {
    id: '3',
    title: 'Project Planning',
    description: `Meeting to discuss next steps for the project we're working on`,
    datetime: 'May 5th, 2024'
  }
];

export default function Example() {
  const { api, store } = useAppContext();
  const [openCreateContactDialog, setOpenCreateContactDialog] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string>();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await api.contacts.getAllContacts();
        const contacts = store.contactStore.contacts;
        if (contacts.length > 0) {
          setSelectedContactId(store.contactStore.contacts[0].id);
          store.contactStore.loadCurrentSelectedContact(store.contactStore.contacts[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <CreateContactDialog
          openCreateContactDialog={openCreateContactDialog}
          setOpenCreateContactDialog={setOpenCreateContactDialog}
        />
        <Sidebar
          contacts={store.contactStore.contacts}
          setOpenCreateContactDialog={setOpenCreateContactDialog}
          setSelectedContactId={setSelectedContactId}
        />

        {/* Main area */}
        <ContactDetailsSection selectedContactId={selectedContactId} />

        {/* Secondary column (hidden on smaller screens) */}
        {/* <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          <div className="flex h-screen bg-white px-6">
            <div className="space-y-6 border-l-2 border-dashed">
              {contactEvents.map((event) => (
                <div key={event.id} className="relative w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-500">
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="ml-6">
                    <h4 className="font-bold text-blue-500">{event.title}</h4>
                    <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                      {event.description}
                    </p>
                    <span className="mt-1 block text-sm font-semibold text-blue-500">
                      {event.datetime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside> */}
      </div>
    </>
  );
}
