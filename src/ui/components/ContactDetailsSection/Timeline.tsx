import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../../../context/app-context';
import { INoteBase } from '../../../data/entities/note.entity';
import { observer } from 'mobx-react-lite';
import EditableTextArea from '../EditableTextArea';
import Note from '../../../data/models/note.model';
import Markdown from 'react-markdown';

interface NoteFormValues {
  title: string;
  body: string;
}

const initialValues: NoteFormValues = {
  title: '',
  body: '',
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required'),
});

export const Timeline: React.FC = observer(() => {
  const { api, store } = useAppContext();

  useEffect(() => {
    const currentSelectedContact = store.contactStore.currentSelectedContact;
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

  // const onSubmit = async (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
  //   await createNote(values);
  //   actions.setSubmitting(false);
  //   actions.resetForm();
  // };

  // const createNote = async (noteData: NoteFormValues) => {
  //   const currentSelectedContact = store.contactStore.currentSelectedContact;

  //   // This is a useless if statement. This page will only show if there is a selected contact but Typescript doesn't know this.
  //   if (currentSelectedContact) {
  //     const createApiData: INoteBase = {
  //       contactId: currentSelectedContact.id,
  //       ...noteData,
  //     };

  //     await api.notes.createNote(createApiData);
  //   }
  // };

  const updateNote = (id: string, notePartial: Partial<Note>) => {
    api.notes.updateNote(id, notePartial);
  };

  const deleteNote = async (id: string) => {
    // TODO: Ask for confirmation to delete

    try {
      await api.notes.deleteNote(id);
    } catch {
      // TODO: placeholder
    }
  };

  return (
    <div>
      {store.contactStore.currentSelectedContact?.notes.map((note) => (
        <Markdown
          key={note.id}
          components={{
            h1: (props) => {
              const { node, ...rest } = props;
              return <h1 className="text-title1 font-semibold text-primary-500" {...rest} />;
            },
            h2: (props) => {
              const { node, ...rest } = props;
              return <h2 className="text-title2 font-medium text-primary-400" {...rest} />;
            },
            h3: (props) => {
              const { node, ...rest } = props;
              return <h3 className="text-title3 font-medium text-primary-300" {...rest} />;
            },
            p: (props) => {
              const { node, ...rest } = props;
              return <p className="text-regular font-normal text-text-primary" {...rest} />;
            },
            li: (props) => {
              const { node, ...rest } = props;
              return (
                <li
                  className="text-small font-normal text-text-secondary pl-4 list-disc"
                  {...rest}
                />
              );
            },
          }}>
          {note.body}
        </Markdown>
      ))}
    </div>
  );
});

// <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
// <Form className="relative">
//   <div className="overflow-hidden rounded-lg border border-dark-700 shadow-sm focus-within:border-accent-200 focus-within:ring-1 focus-within:ring-accent-200 bg-dark-800">
//     <label htmlFor="title" className="sr-only">
//       Title
//     </label>
//     <Field
//       type="text"
//       name="title"
//       id="title"
//       className="block w-full border-0 pt-2.5 text-lg font-medium text-text-primary placeholder:text-dark-500 focus:ring-0 bg-transparent"
//       placeholder="Title"
//     />
//     <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />

//     <label htmlFor="body" className="sr-only">
//       Description
//     </label>
//     <Field
//       as="textarea"
//       rows={2}
//       name="body"
//       id="body"
//       className="block w-full resize-none border-0 py-0 text-text-primary placeholder:text-dark-500 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent"
//       placeholder="Write a description..."
//     />
//     <ErrorMessage name="body" component="div" className="text-red-500 text-sm" />

//     {/* Spacer element to match the height of the toolbar */}
//     <div aria-hidden="true">
//       <div className="py-2">
//         <div className="h-9" />
//       </div>
//       <div className="h-px" />
//       <div className="py-2">
//         <div className="py-px">
//           <div className="h-9" />
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="absolute inset-x-px bottom-0">
//     <div className="flex items-center justify-between space-x-3 border-t border-dark-800 px-2 py-2 sm:px-3">
//       <div className="flex-grow-1">
//         <button
//           type="submit"
//           className="inline-flex items-center rounded-md bg-accent-200 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-200">
//           Create
//         </button>
//       </div>
//     </div>
//   </div>
// </Form>
// </Formik>
