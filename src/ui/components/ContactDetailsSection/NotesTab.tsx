import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../../../context/app-context';
import { INoteBase } from '../../../data/entities/note.entity';
import { observer } from 'mobx-react-lite';

interface NoteFormValues {
  title: string;
  body: string;
}

const initialValues: NoteFormValues = {
  title: '',
  body: ''
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required')
});

export const NotesTab: React.FC = observer(() => {
  const { api, store } = useAppContext();

  useEffect(() => {
    const currentSelectedContact = store.contactStore.currentSelectedContact;
    console.log(currentSelectedContact);
    if (currentSelectedContact) {
      const fetchNotes = async () => {
        try {
          await api.notes.getAllNotes({ contactId: currentSelectedContact.id });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchNotes();
    }
  }, [store.contactStore.currentSelectedContact]);

  const onSubmit = async (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
    console.log('Form data', values);
    await createNote(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  const createNote = async (noteData: NoteFormValues) => {
    const currentSelectedContact = store.contactStore.currentSelectedContact;

    // This is a useless if statement. This page will only show if there is a selected contact but Typescript doesn't know this.
    if (currentSelectedContact) {
      const createApiData: INoteBase = {
        contactId: currentSelectedContact.id,
        ...noteData
      };

      await api.notes.createNote(createApiData);
    }
  };

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="relative">
          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <Field
              type="text"
              name="title"
              id="title"
              className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
              placeholder="Title"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />

            <label htmlFor="body" className="sr-only">
              Description
            </label>
            <Field
              as="textarea"
              rows={2}
              name="body"
              id="body"
              className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Write a description..."
            />
            <ErrorMessage name="body" component="div" className="text-red-500 text-sm" />

            {/* Spacer element to match the height of the toolbar */}
            <div aria-hidden="true">
              <div className="py-2">
                <div className="h-9" />
              </div>
              <div className="h-px" />
              <div className="py-2">
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-px bottom-0">
            <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
              <div className="flex-grow-1">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Create
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      <ul role="list" className="divide-y divide-gray-200">
        {store.noteStore.notes.map((note) => (
          <li key={note.id} className="py-4">
            {note.title}
            {note.body}
          </li>
        ))}
      </ul>
    </div>
  );
});
