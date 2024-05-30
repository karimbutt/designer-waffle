import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FormikHelpers, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';
import Label from '../shared/Label';
import ErrorMsg from '../shared/ErrorMsg';
import TextInput from '../shared/TextInput';
import { Text } from '../shared/Text';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfDay, endOfDay, differenceInMilliseconds, addMilliseconds } from 'date-fns';
import { Button } from '../shared/Button';
// import './custom-datepicker.css';

export type EventFormValues = {
  title: string;
  startDate: Date;
  endDate: Date;
  recurrenceRule?: string;
  notes?: string[];
  isAllDay: boolean;
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  startDate: Yup.date().required('Start date is required').nullable(),
  endDate: Yup.date().nullable(),
  recurrenceRule: Yup.string().nullable(),
  notes: Yup.array().of(Yup.string()),
  isAllDay: Yup.boolean().required(),
});

interface EventFormProps {
  initialValues: EventFormValues;
  onSubmit: (values: EventFormValues, formikHelpers: FormikHelpers<EventFormValues>) => void;
  isSubmitting: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ initialValues, onSubmit, isSubmitting }) => {
  const [diffInMilliseconds, setDiffInMilliseconds] = useState(0);

  const onChangeStartDate = (
    date: Date | null,
    setter: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<EventFormValues>>,
  ) => {
    if (!date) {
      return;
    }
    const start = startOfDay(date);
    setter('startDate', start);
    setter('endDate', addMilliseconds(start, diffInMilliseconds));
  };

  useEffect(() => {
    const diff = differenceInMilliseconds(initialValues.endDate, initialValues.startDate);
    setDiffInMilliseconds(diff);
  }, []);

  const onChangeEndDate = (
    date: Date | null,
    setter: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<EventFormValues>>,
    values: EventFormValues,
  ) => {
    if (!date) {
      return;
    }
    const end = endOfDay(date);
    setter('endDate', end);

    const diff = differenceInMilliseconds(end, values.startDate);
    setDiffInMilliseconds(diff);
  };

  return (
    <div className="max-w-md mx-auto px-8 pt-6 pb-8 mb-4">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ setFieldValue, values, touched }) => (
          <Form>
            <div className="mb-4">
              <Label htmlFor="title">Title</Label>
              <TextInput type="text" name="title" placeholder="Moment title" />
              <ErrorMsg name="title" />
            </div>
            <div className="flex flex-row">
              <div className="mb-4 flex-1">
                <DatePicker
                  selected={values.startDate}
                  onChange={(date) => onChangeStartDate(date, setFieldValue)}
                  className="mt-2 pl-3 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-text-muted focus:ring-2 focus:ring-accent-200 sm:text-sm sm:leading-6"
                />
                <ErrorMsg name="startDate" />
              </div>
              <div className="px-3 flex-2 flex items-center justify-center">
                <Text>to</Text>
              </div>
              <div className="mb-4 flex-1">
                <DatePicker
                  selected={values.endDate}
                  onChange={(date) => onChangeEndDate(date, setFieldValue, values)}
                  className="mt-2 pl-3 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-text-muted focus:ring-2 focus:ring-accent-200 sm:text-sm sm:leading-6"
                />
                <ErrorMsg name="endDate" />
              </div>
            </div>
            {/* <Field
              type="checkbox"
              id="allDay"
              name="allDay"
              className="h-4 w-4 text-accent-200 focus:ring-accent-200"
            /> */}
            {/* 
            <div className="mb-4">
              <Label htmlFor="recurrenceRule">Recurrence Rule</Label>
              <Field
                name="recurrenceRule"
                as="select"
                className="mt-2 pl-3 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-text-muted focus:ring-2 focus:ring-accent-200 sm:text-sm sm:leading-6">
                <option value="">None</option>
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
                <option value="CUSTOM">Custom...</option>
              </Field>
              <ErrorMsg name="recurrenceRule" />
            </div>

            {values.recurrenceRule === 'CUSTOM' && (
              <div className="mb-4">
                <Label htmlFor="customRecurrence">Custom Recurrence Rule</Label>
                <TextInput
                  type="text"
                  name="customRecurrence"
                  placeholder="e.g., FREQ=DAILY;INTERVAL=2"
                />
              </div>
            )} */}
            <Button
              type="submit"
              className="mt-4 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Save Moment'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventForm;
