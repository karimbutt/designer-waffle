// import { Fragment, useRef, useState } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { IRawInput, IRawInputBase } from '../../../data/entities/raw-input.entity';
// import EditableTextArea from '../EditableTextArea';
// import { Field, Form, Formik, FormikHelpers } from 'formik';
// import { useAppContext } from '../../../context/app-context';
// import { INoteBase } from '../../../data/entities/note.entity';
// import * as Yup from 'yup';

// interface NoteFormValues {
//   title: string;
//   body: string;
// }

// const validationSchema = Yup.object().shape({
//   inputText: Yup.string()
//     .min(11, 'Your comment must be at least 11 characters long')
//     .required('Required'),
// });

// // const initialValues: NoteFormValues = {
// //   title: '',
// //   body: ''
// // };

// interface RawInputDialogueDialogInterface {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export const RawInputDialogue: React.FC<RawInputDialogueDialogInterface> = ({
//   open,
//   setOpen,
// }: RawInputDialogueDialogInterface) => {
//   const cancelButtonRef = useRef(null);
//   const [rawInput, setRawInput] = useState<IRawInput | null>(null);

//   const { api, store } = useAppContext();

//   const createRawInput = async ({ inputText }: { inputText: string }) => {
//     const currentSelectedContact = store.contactStore.currentSelectedContact;

//     // TODO: Stupid thing to do for Typescript. See if we can remove this
//     if (!currentSelectedContact) {
//       return;
//     }
//     const values: IRawInputBase = { contactId: currentSelectedContact.id, inputText: inputText };

//     const rawInputResponse = await api.rawInputs.createRawInput(values);
//     setRawInput(rawInputResponse);
//   };

//   // TODO: Abstract this out - used many times
//   // const createNote = async (noteData: NoteFormValues) => {
//   //   const currentSelectedContact = store.contactStore.currentSelectedContact;

//   //   // This is a useless if statement. This page will only show if there is a selected contact but Typescript doesn't know this.
//   //   if (currentSelectedContact) {
//   //     const createApiData: INoteBase = {
//   //       contactId: currentSelectedContact.id,
//   //       ...noteData,
//   //     };

//   //     await api.notes.createNote(createApiData);
//   //   }
//   // };

//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0">
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
//               <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//                 {rawInput == null && (
//                   <Formik
//                     initialValues={{ inputText: '' }}
//                     validationSchema={validationSchema}
//                     onSubmit={(values, { setSubmitting }) => {
//                       createRawInput(values);
//                       setSubmitting(false);
//                     }}>
//                     {({ errors, touched, isSubmitting }) => (
//                       <Form>
//                         <div>
//                           <label
//                             htmlFor="inputText"
//                             className="block text-sm font-medium leading-6 text-gray-900">
//                             Add your comment
//                           </label>
//                           <div className="mt-2">
//                             <Field
//                               as="textarea"
//                               name="inputText"
//                               id="inputText"
//                               className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.inputText && touched.inputText ? 'border-red-500' : 'border-0'}`}
//                               rows="4"
//                               placeholder="Enter your comment"
//                             />
//                             {errors.inputText && touched.inputText && (
//                               <div className="text-red-500 text-sm mt-1">{errors.inputText}</div>
//                             )}
//                             <div className="flex-shrink-0 mt-2">
//                               <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
//                                 Post
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </Form>
//                     )}
//                   </Formik>
//                 )}
//                 {rawInput != null && (
//                   <EditableTextArea
//                     title={rawInput.outputText.title}
//                     body={rawInput.outputText.body}
//                     onSave={(updatedTitle, updatedBody) =>
//                       createNote({ body: updatedBody, title: updatedTitle })
//                     }
//                     onDelete={() => null}
//                   />
//                 )}
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };
