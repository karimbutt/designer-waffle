import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { StandardDialog } from '../components/shared/StandardDialog';
import { ContactDetailsSection } from '../components/ContactDetailsSection/ContactDetailsSection';
import { CreateContactForm } from '../components/CreateContactForm';
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { ROUTES } from '../../utils/routes';
import { useAppContext } from '../../context/app-context';
import { observer } from 'mobx-react-lite';

export const MainPage = observer(() => {
  const { api, store } = useAppContext();
  const [openCreateContactDialog, setOpenCreateContactDialog] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div>
      <StandardDialog open={openCreateContactDialog} setOpen={setOpenCreateContactDialog}>
        <CreateContactForm setOpenCreateContactDialog={setOpenCreateContactDialog} />
      </StandardDialog>
      <div onClick={() => store.ui.setKeyboardFocus('sidebar')}>
        <Sidebar setOpenCreateContactDialog={setOpenCreateContactDialog} />
      </div>
      <div onClick={() => store.ui.setKeyboardFocus('main')}>
        <ContactDetailsSection />
      </div>
    </div>
  );
});
