import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { useAppContext } from '../../context/app-context';
import { IContact } from '../../data/entities/contact.entity';
import { observer } from 'mobx-react-lite';
import { getContactInitials } from '../../utils/getContactInitials';

// interface Directory {
//   [key: string]: { id: number; name: string; email: string; imageUrl: string }[];
// }

// const directory: Directory = {
//   A: [
//     {
//       id: 1,
//       name: 'Leslie Abbott',
//       email: 'leslie.abbott@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 2,
//       name: 'Hector Adams',
//       email: 'hector.adams@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 3,
//       name: 'Blake Alexander',
//       email: 'blake.alexander@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 4,
//       name: 'Fabricio Andrews',
//       email: 'fabricio.andrews@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     }
//   ],
//   B: [
//     {
//       id: 5,
//       name: 'Angela Beaver',
//       email: 'angela.beaver@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 6,
//       name: 'Yvette Blanchard',
//       email: 'yvette.blanchard@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 7,
//       name: 'Lawrence Brooks',
//       email: 'lawrence.brooks@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     }
//   ],
//   C: [
//     {
//       id: 8,
//       name: 'Jeffrey Clark',
//       email: 'jeffrey.clark@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 9,
//       name: 'Kathryn Cooper',
//       email: 'kathryn.cooper@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     }
//   ],
//   E: [
//     {
//       id: 10,
//       name: 'Alicia Edwards',
//       email: 'alicia.edwards@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 11,
//       name: 'Benjamin Emerson',
//       email: 'benjamin.emerson@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 12,
//       name: 'Jillian Erics',
//       email: 'jillian.erics@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 13,
//       name: 'Chelsea Evans',
//       email: 'chelsea.evans@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     }
//   ],
//   G: [
//     {
//       id: 14,
//       name: 'Michael Gillard',
//       email: 'micheal.gillard@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 15,
//       name: 'Dries Giuessepe',
//       email: 'dries.giuessepe@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     }
//   ],
//   M: [
//     {
//       id: 16,
//       name: 'Jenny Harrison',
//       email: 'jenny.harrison@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 17,
//       name: 'Lindsay Hatley',
//       email: 'lindsay.hatley@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 18,
//       name: 'Anna Hill',
//       email: 'anna.hill@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     }
//   ],
//   S: [
//     {
//       id: 19,
//       name: 'Courtney Samuels',
//       email: 'courtney.samuels@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 20,
//       name: 'Tom Simpson',
//       email: 'tom.simpson@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     }
//   ],
//   T: [
//     {
//       id: 21,
//       name: 'Floyd Thompson',
//       email: 'floyd.thompson@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 22,
//       name: 'Leonard Timmons',
//       email: 'leonard.timmons@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 23,
//       name: 'Whitney Trudeau',
//       email: 'whitney.trudeau@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     }
//   ],
//   W: [
//     {
//       id: 24,
//       name: 'Kristin Watson',
//       email: 'kristin.watson@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     },
//     {
//       id: 25,
//       name: 'Emily Wilson',
//       email: 'emily.wilson@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     }
//   ],
//   Y: [
//     {
//       id: 26,
//       name: 'Emma Young',
//       email: 'emma.young@example.com',
//       imageUrl:
//         'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
//     }
//   ]
// };

const groupAndSortContactsAlphabetically = (contacts: IContact[]): Record<string, IContact[]> => {
  const grouped: Record<string, IContact[]> = {};

  // Sort contacts by last name
  contacts.sort((a, b) => a.lastName.localeCompare(b.lastName));

  // Group contacts by the first letter of their last name
  for (const contact of contacts) {
    const letter = contact.lastName.charAt(0).toUpperCase(); // First letter of last name
    if (!grouped[letter]) {
      grouped[letter] = [];
    }
    grouped[letter].push(contact);
  }

  return grouped;
};

interface SidebarProps {
  contacts: IContact[];
  setOpenCreateContactDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedContactId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const Sidebar: React.FC<SidebarProps> = observer(
  ({ contacts, setOpenCreateContactDialog, setSelectedContactId }) => {
    const { store } = useAppContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const alphabeticallyGroupedContacts = groupAndSortContactsAlphabetically(contacts);

    return (
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full">
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {store.contactStore.contacts.map((contact) => (
                              <li key={contact.id}>
                                {/* <UsersIcon
                                  className={classNames(
                                    item.current
                                      ? 'text-indigo-600'
                                      : 'text-gray-400 group-hover:text-indigo-600',
                                    'h-6 w-6 shrink-0'
                                  )}
                                  aria-hidden="true"
                                /> */}
                                {contact.firstName}
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your teams
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex flex-2 h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto flex-1"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <a
                href="#"
                className="flex flex-3 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="sr-only">Your profile</span>
              </a>
            </div>
            <nav className="flex flex-1 flex-col">
              <div className="pb-5 flex flex-row">
                <h3 className="text-base font-semibold leading-6 text-gray-900 flex-1">Contacts</h3>
                <button
                  type="button"
                  onClick={() => setOpenCreateContactDialog(true)}
                  className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex flex-row mb-3">
                {/* Search bar */}
                <div className="flex flex-2">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search for contacts"
                  />
                </div>

                {/* dropdown */}
                <div className="flex flex-1">
                  <select
                    id="location"
                    name="location"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue="Sort">
                    <option>Alphabetical</option>
                    <option>Recently Seen</option>
                    <option>Not Recently Seen</option>
                  </select>
                </div>
              </div>

              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <nav className="h-full overflow-y-auto" aria-label="Directory">
                    {Object.keys(alphabeticallyGroupedContacts).map((letter) => (
                      <div key={letter} className="relative">
                        <div className="sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
                          <h3>{letter}</h3>
                        </div>
                        <ul role="list" className="divide-y divide-gray-100">
                          {alphabeticallyGroupedContacts[letter].map((contact) => (
                            <button
                              onClick={() => setSelectedContactId(contact.id)}
                              key={contact.id}>
                              <li className="flex gap-x-4 px-3 py-3">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                                  <span className="text-sm font-medium leading-none text-white">
                                    {getContactInitials(contact)}
                                  </span>
                                </span>
                                <div className="min-w-0 ">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {contact.firstName} {contact.lastName}
                                  </p>
                                </div>
                              </li>
                            </button>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </nav>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>
      </div>
    );
  }
);
