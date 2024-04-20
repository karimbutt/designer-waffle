import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { IContactBase } from '../../../data/entities/contact.entity';
import { useAppContext } from '../../../context/app-context';

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required')
});

// interface FormValues {
//   firstName: string;
//   lastName: string;
// }

interface CreateContactFormInterface {
  setOpenCreateContactDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateContactForm = ({ setOpenCreateContactDialog }: CreateContactFormInterface) => {
  const { api } = useAppContext();
  // Placeholder onSubmit handler
  const handleSubmit = (values: IContactBase, { setSubmitting }: FormikHelpers<IContactBase>) => {
    try {
      api.contacts.createContact(values);
      setOpenCreateContactDialog(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting, resetForm }) => (
        <Form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">New Contact</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Enter the details for your new contact.
              </p>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please fill out the form below.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-600 text-sm" />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-600 text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent default button click behavior
                resetForm(); // Reset the form before closing
                setOpenCreateContactDialog(false);
              }}
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
