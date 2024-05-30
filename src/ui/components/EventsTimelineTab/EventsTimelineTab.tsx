import { observer } from 'mobx-react-lite';
import { useAppContext } from '../../../context/app-context';
import { parseISO, format } from 'date-fns';
import { CircledCharacterPair } from '../shared/CircledLetterPair';
import { Text } from '../shared/Text';
import { Button } from '../shared/Button';
import {
  BellAlertIcon,
  BellSlashIcon,
  CalendarDaysIcon,
  DocumentCheckIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { EmptyMomentState } from './EmptyMomentState';

const formatTimeRange = (startDate: Date, endDate: Date) => {
  const startTime = format(startDate, 'h:mm');
  const startPeriod = format(startDate, 'a').toLowerCase();
  const endTime = format(endDate, 'h:mm');
  const endPeriod = format(endDate, 'a').toLowerCase();

  return `${startTime} - ${endTime}${startPeriod === endPeriod ? endPeriod : ` ${endPeriod}`}`;
};

export const EventsTimelineTab = observer(() => {
  const { store } = useAppContext();
  const selectedContact = store.contacts.currentSelectedContact;

  if (!selectedContact) {
    return <></>;
  }

  if (selectedContact.events.length == 0) {
    return <EmptyMomentState message="Create a new moment to remember about Ed Liao" />;
  }

  const events = selectedContact.eventsByDate;

  return (
    <div>
      <div className="rounded-md bg-indigo-200 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            🗓️
            {/* <CalendarDaysIcon className="h-5 w-5 text-indigo-400" aria-hidden="true" /> */}
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-indigo-700">
              {`Connect your calendar to automatically pull in your Moments❣️ with ${selectedContact.firstName}`}
            </p>
            <p className="mt-3 text-sm md:ml-6 md:mt-0">
              <a
                href="#"
                className="whitespace-nowrap font-medium text-indigo-700 hover:text-blue-600">
                Connect
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </div>
      {Object.keys(events).map((dateString) => {
        const parsedDate = parseISO(dateString);
        const dateNumber = format(parsedDate, 'd');
        const month = format(parsedDate, 'MMM');
        const day = format(parsedDate, 'eee');
        const monthDay = `${month}, ${day}`;

        return (
          <div key={dateString} className="my-2">
            <div className="flex flex-row border-b border-dark-900">
              <div className="flex w-1/5 flex-row">
                <CircledCharacterPair letters={dateNumber} radius={10} className="bg-stone-600" />
                <div className="flex">
                  <Text className="flex-1 text-md font-semibold leading-6 mx-8 text-white">
                    {monthDay}
                  </Text>
                </div>
              </div>
              <ul role="list" className="flex flex-col w-4/5 ">
                {events[dateString].map((event) => (
                  <li
                    key={event.id}
                    className="flex mb-2 items-center p-1 rounded-md cursor-pointer hover:bg-stone-800">
                    <div className="flex flex-row w-1/5 items-center">
                      <div className="w-4 h-4 bg-indigo-400 rounded-full"></div>
                      {event.isAllDay ? (
                        <Text className="flex-1 text-sm leading-6 mx-4 text-gray-300">All Day</Text>
                      ) : (
                        <Text className="flex-1 text-md font-semibold leading-6 mx-8 text-gray-300">
                          {formatTimeRange(event.startDate, event.endDate)}
                        </Text>
                      )}
                      {/* <div className="flex-1">{event.startDate}</div> */}
                    </div>
                    <Text className="flex-1 text-sm font-semibold leading-6 mx-4 text-white">
                      {event.title}
                    </Text>
                    <Button
                      type="button"
                      variant="muted-secondary"
                      className="px-0 pl-3 pr-1 focus:outline-none"
                      onClick={() => null}>
                      <DocumentCheckIcon className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      variant="muted-secondary"
                      className="px-0 pl-3 pr-1 focus:outline-none">
                      <BellAlertIcon className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      variant="muted-secondary"
                      className="px-0 pl-3 pr-1 focus:outline-none">
                      <BellSlashIcon className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
});
