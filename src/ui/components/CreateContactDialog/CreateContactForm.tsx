import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { IContactBase } from '../../../data/entities/contact.entity';
import { useAppContext } from '../../../context/app-context';
import Label from '../Label';
import TextInput from '../TextInput';
import ErrorMsg from '../ErrorMsg';
import { Button } from '../Button';

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
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
        lastName: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting, resetForm, touched }) => (
        <Form>
          <div className="space-y-6">
            <div className="border-b border-dark-700 pb-3">
              <h2 className="text-base font-semibold text-text-primary">Add a new person</h2>
              <p className="mt-1 text-sm leading-6 text-text-secondary">
                Enter any details you have for this new person.
              </p>
            </div>

            <div className="border-b border-dark-700 pb-12">
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Label htmlFor="firstName">First Name</Label>
                  <TextInput name="firstName" type="text" />
                  <ErrorMsg name="firstName" />
                </div>

                <div className="sm:col-span-3">
                  <Label htmlFor="lastName">Last Name</Label>
                  <TextInput name="lastName" type="text" />
                  <ErrorMsg name="lastName" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              onClick={(e) => {
                e.preventDefault(); // Prevent default button click behavior
                resetForm(); // Reset the form before closing
                setOpenCreateContactDialog(false);
              }}
              type="button"
              variant="secondary"
              disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
