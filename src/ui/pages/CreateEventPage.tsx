import { ArrowLeftIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Text } from '../components/shared/Text';
import { Button } from '../components/shared/Button';
import SimpleAlertDialog from '../components/shared/SimpleAlertDialog';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/app-context';
import { addMilliseconds, differenceInMilliseconds, endOfDay, startOfDay } from 'date-fns';
import * as Yup from 'yup';
import {
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikProps,
  useFormikContext,
} from 'formik';
import ErrorMsg from '../components/shared/ErrorMsg';
import DatePicker from 'react-datepicker';
import Label from '../components/shared/Label';
import { Listbox, Transition } from '@headlessui/react';
import { classNames } from '../../utils/classNames';
import { IEventBase } from '../../data/entities/event.entity';
import { useHotkeys } from 'react-hotkeys-hook';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';

export type EventFormValues = {
  title: string;
  startDate: Date;
  endDate: Date;
  recurrenceRule?: string;
  notes?: string[];
  isAllDay: boolean;
};

export type EventType =
  | 'meeting'
  | 'email'
  | 'call'
  | 'messaging'
  | 'meal'
  | 'networking'
  | 'social'
  | 'otherInteraction'
  | 'lifeEvent'
  | 'workEvent'
  | 'birthday'
  | 'anniversary'
  | 'appointment'
  | 'reconnect'
  | 'otherNotableDate';

export type EventCategory = 'Interaction Moments' | 'Notable Moments';

interface EventTypeOption {
  id: EventType;
  name: string;
  category: EventCategory;
}

const EventTypeOptions: EventTypeOption[] = [
  { id: 'meeting', name: '📅 Meeting', category: 'Interaction Moments' },
  { id: 'email', name: '📧 Email', category: 'Interaction Moments' },
  { id: 'call', name: '📞 Call', category: 'Interaction Moments' },
  { id: 'messaging', name: '📱 Text/Messaging', category: 'Interaction Moments' },
  { id: 'meal', name: '🍔 Meal / Coffee', category: 'Interaction Moments' },
  { id: 'networking', name: '🤝 Networking', category: 'Interaction Moments' },
  { id: 'social', name: '🥂 Social Event', category: 'Interaction Moments' },
  { id: 'otherInteraction', name: '🗣️ Other Interaction', category: 'Interaction Moments' },

  { id: 'lifeEvent', name: '🎉 Life Event', category: 'Notable Moments' },
  { id: 'workEvent', name: '💼 Work Event', category: 'Notable Moments' },
  { id: 'birthday', name: '🎂 Birthday', category: 'Notable Moments' },
  { id: 'reconnect', name: '🔔 Reconnect Date', category: 'Notable Moments' },
  { id: 'otherNotableDate', name: '📆 Other Notable Date', category: 'Notable Moments' },
];

const categorizedEventTypes: Record<EventCategory, { id: EventType; name: string }[]> = {
  'Notable Moments': [],
  'Interaction Moments': [],
};

EventTypeOptions.forEach((eventType) => {
  categorizedEventTypes[eventType.category].push({ id: eventType.id, name: eventType.name });
});

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  startDate: Yup.date().required('Start date is required').nullable(),
  endDate: Yup.date().nullable(),
  recurrenceRule: Yup.string().nullable(),
  notes: Yup.array().of(Yup.string()).nullable(),
  isAllDay: Yup.boolean().required(),
});

const NewEventInitialValues: EventFormValues = {
  title: '',
  startDate: startOfDay(new Date()),
  endDate: endOfDay(new Date()),
  isAllDay: true,
};

const formatRecurrenceOptions = (startDate: Date) => {
  const dayOfWeek = format(startDate, 'EEE').toUpperCase();
  const fullDayOfWeek = format(startDate, 'EEEE');
  const dayOfMonth = format(startDate, 'd');
  const dayOfMonthOrdinal = format(startDate, 'do');
  const monthOfYear = format(startDate, 'M');
  const fullMonthOfYear = format(startDate, 'MMMM');

  return [
    { id: 'none', name: 'Does not repeat', value: '' },
    { id: 'daily', name: 'Daily', value: 'RRULE:FREQ=DAILY' },
    {
      id: 'weekly',
      name: `Weekly on ${fullDayOfWeek}`,
      value: `RRULE:FREQ=WEEKLY;BYDAY=${dayOfWeek}`,
    },
    {
      id: 'monthly',
      name: `Monthly on the ${dayOfMonthOrdinal}`,
      value: `RRULE:FREQ=MONTHLY;BYMONTHDAY=${dayOfMonth}`,
    },
    {
      id: 'annually',
      name: `Annually on ${fullMonthOfYear} ${dayOfMonthOrdinal}`,
      value: `RRULE:FREQ=YEARLY;BYMONTH=${monthOfYear};BYMONTHDAY=${dayOfMonth}`,
    },
  ];
};

const getFriendlyRecurrenceName = (rrule: string, startDate: Date): string => {
  const recurrenceOptions = formatRecurrenceOptions(startDate);
  const option = recurrenceOptions.find((option) => option.value === rrule);
  return option ? option.name : 'Custom';
};

export const CreateEventPage = () => {
  const { api, store } = useAppContext();
  const [templatePickerOpen, setTemplatePickerOpen] = useState<boolean>(false);
  const [saveWarningDialogueOpen, setSaveWarningDialogueOpen] = useState<boolean>(false);
  const [attachNote, setAttachNote] = useState<boolean>(false);
  const navigate = useNavigate();
  const [selectedEventType, setSelectedEventType] = useState<EventTypeOption>(EventTypeOptions[0]);
  const dirtyRef = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const selectedContact = store.contacts.currentSelectedContact;
  const formikRef = useRef<FormikProps<EventFormValues>>(null);

  // const headerText = `New moment❣️ with ${store.contacts.currentSelectedContact?.firstName} ${store.contacts.currentSelectedContact?.lastName}`;

  useHotkeys(
    'esc',
    (e) => {
      e.preventDefault();
      goBack();
    },
    {
      enabled: !saveWarningDialogueOpen,
    },
    [navigate],
  );

  const goBack = () => {
    navigate(-1);
  };

  const warnAndGoBack = () => {
    if (dirtyRef.current) {
      setSaveWarningDialogueOpen(true);
    } else {
      goBack();
    }
  };

  const handleNoteTitleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    // setNoteTitle(target.value);
    // setFormWasChanged(true);
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

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
    const diff = differenceInMilliseconds(
      NewEventInitialValues.endDate,
      NewEventInitialValues.startDate,
    );
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

  // Focuses the title field so that the user can just start typing right away when creating a new note (but not on edit)
  useEffect(() => {
    // if (initialFieldFocused) {
    // Timeout used in order to not have the keystroke to get to this page be included in the input field
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100); // Delay focus by 100 milliseconds

    return () => clearTimeout(timer); // Clean up the timer
    // }
  }, []);

  const handleRefSubmit = () => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  };

  const onEventSubmit = async (
    values: EventFormValues,
    { setSubmitting, resetForm }: FormikHelpers<EventFormValues>,
  ) => {
    console.log(values);
    // For typescript to be happy
    if (!selectedContact) {
      return;
    }
    try {
      // Map EventFormValues to IEventBase
      const eventData: IEventBase = {
        title: values.title,
        startDate: values.startDate,
        endDate: values.endDate,
        recurrenceRule: values.recurrenceRule,
        notes: values.notes,
        contactId: selectedContact.id,
        isAllDay: values.isAllDay,
      };
      // Create a new event using the API
      await api.events.createEvent(eventData);
      // Reset the form to its initial state
      resetForm();
      goBack();
      // Close the dialog (assuming this function is available in the scope)
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      // Set submitting state to false
      setSubmitting(false);
    }
  };

  return (
    <main className="px-12 flex flex-row">
      <div className="mt-10 flex-shrink">
        <button
          type="button"
          onClick={() => warnAndGoBack()}
          className="rounded-full bg-neutral-600 p-2 text-text-muted hover:text-text-secondary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <ArrowLeftIcon className="h-7 w-7" aria-hidden="true" />
        </button>
      </div>
      <div className="px-44 flex-grow">
        <div className="bg-zinc-900 p-10 min-h-screen">
          {/* <Text type="small" className="text-neutral-300 mb-2">
            {headerText}
          </Text> */}
          <Formik
            innerRef={formikRef}
            initialValues={NewEventInitialValues}
            validationSchema={validationSchema}
            onSubmit={onEventSubmit}>
            {({ setFieldValue, values, isSubmitting, dirty, ...formik }) => {
              useEffect(() => {
                dirtyRef.current = dirty;
              }, [dirty]);

              return (
                <Form>
                  <div className="w-full flex flex-col mb-4">
                    <div className="w-full flex flex-row">
                      <textarea
                        ref={inputRef}
                        {...formik.getFieldProps('title')}
                        value={values.title}
                        placeholder="Add Title"
                        rows={1}
                        className="mr-3 flex-2 resize-none w-full bg-transparent focus:outline-none focus:ring-0 placeholder-text-muted caret-white text-text-primary text-heading2 border-b-gray-700 border-b focus:border-b-1 focus:border-b-indigo-400"
                      />
                      <div className="flex-3">
                        <Listbox value={selectedEventType} onChange={setSelectedEventType}>
                          {({ open }) => (
                            <>
                              <div className="relative mt-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-16 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                  <span className="block truncate">{selectedEventType.name}</span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0">
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {Object.entries(categorizedEventTypes).map(
                                      ([category, eventTypes]) => (
                                        <div key={category}>
                                          <div className="px-4 py-2 text-gray-500">{category}</div>
                                          {eventTypes.map((eventType) => (
                                            <Listbox.Option
                                              key={eventType.id}
                                              className={({ active }) =>
                                                classNames(
                                                  active
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'text-gray-900',
                                                  'relative cursor-default select-none py-2 pl-8 pr-4',
                                                )
                                              }
                                              value={eventType}>
                                              {({ selected, active }) => (
                                                <>
                                                  <span
                                                    className={classNames(
                                                      selected ? 'font-semibold' : 'font-normal',
                                                      'block truncate',
                                                    )}>
                                                    {eventType.name}
                                                  </span>
                                                </>
                                              )}
                                            </Listbox.Option>
                                          ))}
                                        </div>
                                      ),
                                    )}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                      <Button
                        type="submit"
                        className="flex-1 ml-6 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                        disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Save'}
                      </Button>
                    </div>
                    <ErrorMsg name="title" />
                  </div>
                  <div className="flex flex-row">
                    <div className="mb-4">
                      <DatePicker
                        showTimeSelect={!values.isAllDay}
                        selected={values.startDate}
                        onChange={(date) => onChangeStartDate(date, setFieldValue)}
                        dateFormat={!values.isAllDay ? 'MMMM d, yyyy h:mm aa' : 'MMMM d, yyyy'}
                        // className=" mt-2 px-3 flex-2 resize-none w-full bg-transparent focus:outline-none focus:ring-0 placeholder-text-muted caret-white text-text-primary border-b-gray-700 border-b focus:border-b-1 focus:border-b-indigo-400"
                        className="mt-2 px-3 block w-full rounded-md bg-stone-300 py-1.5 text-gray-900 shadow-sm placeholder:text-text-muted focus:ring-2 focus:ring-accent-200 sm:text-sm sm:leading-6"
                      />
                      <ErrorMsg name="startDate" />
                    </div>

                    <>
                      <div className="px-3 flex items-center justify-center">
                        <Text className="text-neutral-300">to</Text>
                      </div>
                      <div className="mb-4 flex-1">
                        <DatePicker
                          showTimeSelect={!values.isAllDay}
                          selected={values.endDate}
                          onChange={(date) => onChangeEndDate(date, setFieldValue, values)}
                          dateFormat={!values.isAllDay ? 'MMMM d, yyyy h:mm aa' : 'MMMM d, yyyy'}
                          className="mt-2 px-3 block w-full rounded-md bg-stone-300 py-1.5 text-gray-900 shadow-sm placeholder:text-text-muted focus:ring-2 focus:ring-accent-200 sm:text-sm sm:leading-6"
                        />
                        <ErrorMsg name="endDate" />
                      </div>
                    </>
                  </div>
                  <div className="flex flex-row space-x-5 items-center">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        id="isAllDay"
                        name="isAllDay"
                        className="h-4 w-4 text-accent-200 focus:ring-accent-200"
                      />
                      <Label htmlFor="isAllDay" className="ml-3 text-neutral-300 text-regular">
                        All day
                      </Label>
                    </div>
                    <div className="flex items-center justify-center align-middle">
                      <Listbox
                        value={values.recurrenceRule}
                        onChange={(value) => {
                          const selectedOption = formatRecurrenceOptions(values.startDate).find(
                            (option) => option.id === value,
                          );
                          setFieldValue('recurrenceRule', selectedOption?.value);
                        }}>
                        {({ open }) => (
                          <>
                            <div className="relative">
                              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <span className="block truncate">
                                  {formatRecurrenceOptions(values.startDate).find(
                                    (option) => option.value === values.recurrenceRule,
                                  )?.name || 'Select recurrence'}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {formatRecurrenceOptions(values.startDate).map((option) => (
                                    <Listbox.Option
                                      key={option.id}
                                      className={({ active }) =>
                                        classNames(
                                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                          'relative cursor-default select-none py-2 pl-4 pr-4',
                                        )
                                      }
                                      value={option.id}>
                                      {({ selected, active }) => (
                                        <>
                                          <span
                                            className={classNames(
                                              selected ? 'font-semibold' : 'font-normal',
                                              'block truncate',
                                            )}>
                                            {option.name}
                                          </span>
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </div>
                  ;
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      <SimpleAlertDialog
        isOpen={saveWarningDialogueOpen}
        setIsOpen={setSaveWarningDialogueOpen}
        title={'Save moment?'}
        bodyText="Would you like to save this moment?"
        mainButtonOnClick={handleRefSubmit}
        mainButtonText="Save"
        secondaryButtonOnClick={goBack}
        secondaryButtonText="Discard"
      />
    </main>
  );
};
