import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { StandardDialog } from '../components/shared/StandardDialog';
import { CreateContactForm } from '../components/CreateContactForm';
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { ROUTES } from '../../constants/routes';
import { useAppContext } from '../../context/app-context';
import { observer } from 'mobx-react-lite';
import { classNames } from '../../utils/classNames';
import { getContactInitials } from '../../utils/getContactInitials';
import {
  CalendarDaysIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/shared/Button';
import { NotesTab } from '../components/NotesListTab/NotesList';
import EventForm, { EventFormValues } from '../components/EventForm/EventForm';
import { IEventBase } from '../../data/entities/event.entity';
import { FormikHelpers } from 'formik';
import { EventsTimelineTab } from '../components/EventsTimelineTab/EventsTimelineTab';
import { startOfDay, endOfDay, startOfToday, addDays } from 'date-fns';

// const NewEventInitialValues: EventFormValues = {
//   title: '',
//   startDate: startOfDay(new Date()),
//   endDate: endOfDay(new Date()),
//   isAllDay: true,
// };

export const MainPage = observer(() => {
  const { api, store } = useAppContext();
  const [openCreateContactDialog, setOpenCreateContactDialog] = useState(false);
  // const [openCreateEventDialog, setOpenCreateEventDialog] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notes');
  const selectedContact = store.contacts.currentSelectedContact;

  useHotkeys(
    'c',
    () => {
      navigate(ROUTES.CREATE_NOTE);
    },
    [navigate],
  );

  useHotkeys(
    'down',
    () => {
      if (store.ui.keyboardFocusArea == 'sidebar') {
        store.contacts.selectNextContact();
      } else if (
        store.ui.keyboardFocusArea == 'main' &&
        store.contacts.currentSelectedContact &&
        store.contacts.currentSelectedContact.notes.length > 0
      ) {
        store.contacts.currentSelectedContact.selectNextNote();
      }
    },
    [store.contacts, store.ui],
  );

  useHotkeys(
    'up',
    () => {
      if (store.ui.keyboardFocusArea == 'sidebar') {
        store.contacts.selectPreviousContact();
      } else if (
        store.ui.keyboardFocusArea == 'main' &&
        store.contacts.currentSelectedContact &&
        store.contacts.currentSelectedContact.notes.length > 0
      ) {
        store.contacts.currentSelectedContact.selectPreviousNote();
      }
    },
    [store.contacts, store.ui],
  );

  useHotkeys(
    'tab',
    (e) => {
      e.preventDefault();
      if (store.ui.keyboardFocusArea == 'main') {
        store.ui.setKeyboardFocus('sidebar');
      } else {
        store.ui.setKeyboardFocus('main');
      }
    },
    {
      preventDefault: true,
    },
    [store.ui],
  );

  useHotkeys(
    ['esc', 'left'],
    (e) => {
      e.preventDefault();
      if (store.ui.keyboardFocusArea == 'main') {
        store.ui.setKeyboardFocus('sidebar');
      }
    },
    {
      preventDefault: true,
    },
    [store.ui],
  );

  useHotkeys(
    ['right'],
    (e) => {
      e.preventDefault();
      const currentSelectedContact = store.contacts.currentSelectedContact;
      if (
        store.ui.keyboardFocusArea == 'sidebar' &&
        currentSelectedContact &&
        currentSelectedContact.currentSelectedNoteId
      ) {
        store.ui.setKeyboardFocus('main');
      }
    },
    {
      preventDefault: true,
    },
    [store.ui],
  );

  useHotkeys(
    'enter',
    (e) => {
      e.preventDefault();

      const currentSelectedContact = store.contacts.currentSelectedContact;
      if (
        store.ui.keyboardFocusArea == 'main' &&
        currentSelectedContact &&
        currentSelectedContact.notes.length > 0 &&
        currentSelectedContact.currentSelectedNoteId
      ) {
        navigate(`${ROUTES.NOTES}/${currentSelectedContact.currentSelectedNoteId}/edit`);
      } else if (store.ui.keyboardFocusArea == 'sidebar') {
        store.ui.setKeyboardFocus('main');
      }
    },
    {
      preventDefault: true,
    },
    [store.ui, store.contacts],
  );

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await api.contacts.getAllContacts();

        const contacts = store.contacts.contacts;
        if (contacts.length > 0 && !store.contacts.currentSelectedContact) {
          store.contacts.setCurrentSelectedContact(store.contacts.contacts[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const currentSelectedContact = store.contacts.currentSelectedContact;
    if (currentSelectedContact) {
      const fetchNotes = async () => {
        try {
          await api.notes.getAllNotes({ contactId: currentSelectedContact.id });
        } catch (error) {
          console.error('Error fetching data:', error);
        }

        if (
          currentSelectedContact.notes.length > 0 &&
          currentSelectedContact.currentSelectedNoteId == null
        ) {
          currentSelectedContact.setCurrentSelectedNote(currentSelectedContact.notes[0].id);
        }
      };

      fetchNotes();
    }
  }, [store.contacts.currentSelectedContact]);

  const goToCreateMoment = () => {
    setActiveTab('timeline');
    navigate(ROUTES.CREATE_EVENT);
  };

  useEffect(() => {
    const currentSelectedContact = store.contacts.currentSelectedContact;
    if (currentSelectedContact) {
      const fetchEvents = async () => {
        const startDateQuery = startOfToday();
        const endDateQuery = endOfDay(addDays(startDateQuery, 30));

        try {
          await api.events.getAllEvents({
            startDate: startDateQuery,
            endDate: endDateQuery,
            contactId: currentSelectedContact.id,
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchEvents();
    }
  }, [store.contacts.currentSelectedContact]);

  useEffect(() => {
    const setUiFocus = async () => {
      const currentSelectedContact = store.contacts.currentSelectedContact;
      if (store.ui.keyboardFocusArea == null && currentSelectedContact) {
        if (currentSelectedContact.notes.length > 0) {
          store.ui.setKeyboardFocus('main');
        } else {
          store.ui.setKeyboardFocus('sidebar');
        }
      }
    };

    setUiFocus();
  }, [store.contacts.currentSelectedContact]);

  // const handleEventFormSubmit = async (
  //   values: EventFormValues,
  //   { setSubmitting, resetForm }: FormikHelpers<EventFormValues>,
  // ) => {
  //   // For typescript to be happy
  //   if (!selectedContact) {
  //     return;
  //   }

  //   try {
  //     // Map EventFormValues to IEventBase
  //     const eventData: IEventBase = {
  //       title: values.title,
  //       startDate: values.startDate,
  //       endDate: values.endDate,
  //       recurrenceRule: values.recurrenceRule,
  //       notes: values.notes,
  //       contactId: selectedContact.id,
  //       isAllDay: values.isAllDay,
  //     };

  //     // Create a new event using the API
  //     const createdEvent = await api.events.createEvent(eventData);

  //     // Update the store with the new event
  //     store.events.setEvent(createdEvent.id, createdEvent);

  //     // Reset the form to its initial state
  //     resetForm();

  //     // Close the dialog (assuming this function is available in the scope)
  //     setOpenCreateEventDialog(false);
  //     setActiveTab('timeline');
  //   } catch (error) {
  //     console.error('Failed to create event:', error);
  //   } finally {
  //     // Set submitting state to false
  //     setSubmitting(false);
  //   }
  // };

  useEffect(() => {
    const resetToNotes = async () => {
      setActiveTab('notes');
    };

    resetToNotes();
  }, [store.contacts.currentSelectedContact]);

  // TODO: handle state betetr when there is no contact
  if (!selectedContact) {
    return <></>;
  }

  // TODO: refactor the tabs to repeat the code less
  return (
    <div>
      <StandardDialog open={openCreateContactDialog} setOpen={setOpenCreateContactDialog}>
        <CreateContactForm setOpenCreateContactDialog={setOpenCreateContactDialog} />
      </StandardDialog>
      {/* <StandardDialog
        open={openCreateEventDialog}
        setOpen={setOpenCreateEventDialog}
        className="sm:min-h-[25rem]">
        <EventForm
          onSubmit={handleEventFormSubmit}
          // TODO: have to add this as state and then change in it handleEventFormSubmit
          isSubmitting={false}
          initialValues={NewEventInitialValues}
        />
      </StandardDialog> */}
      <div onClick={() => store.ui.setKeyboardFocus('sidebar')}>
        <Sidebar setOpenCreateContactDialog={setOpenCreateContactDialog} />
      </div>
      <div onClick={() => store.ui.setKeyboardFocus('main')}>
        <div className="bg-zinc-900 min-h-screen">
          <div className="text- p-2 pr-6  flex justify-end items-center shadow-sm ">
            <Button
              type="button"
              variant="muted-primary"
              className="px-0 pl-3 pr-1 focus:outline-none"
              onClick={() => null}>
              🔍
              {/* <PencilSquareIcon className="h-5 w-5" aria-hidden="true" /> */}
            </Button>
            <Button
              type="button"
              variant="muted-primary"
              className="px-0 pl-3 pr-1 focus:outline-none"
              onClick={() => navigate(ROUTES.CREATE_NOTE)}>
              <span className="inline-block transform scale-x-[-1]">✏️</span>
              {/* <PencilSquareIcon className="h-5 w-5" aria-hidden="true" /> */}
            </Button>
            <Button
              type="button"
              variant="muted-primary"
              className="px-0 pl-3 pr-1 focus:outline-none"
              onClick={() => goToCreateMoment()}>
              ❣️
              {/* <CalendarDaysIcon className="h-5 w-5" aria-hidden="true" /> */}
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
                    {/* TODO: Make tabs into a constant so that we aren't just putting in random strings here */}
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
                      Notes <span className="inline-block transform scale-x-[-1]">✏️</span>
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
                      Reminders❣️
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
                      About
                    </button>
                  </nav>
                  {activeTab == 'notes' && <NotesTab />}
                  {activeTab == 'details' && (
                    <div className="text-gray-100">
                      All of the details about a person (e.g., where they live, company they work
                      at, emails, social, etc.) that can be editted will go here as well as
                      information coming in from integrations (not editable). This will kind of
                      serve as the ultimate contact book here.
                    </div>
                  )}
                  {activeTab == 'timeline' && <EventsTimelineTab />}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
});
