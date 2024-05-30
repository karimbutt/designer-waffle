import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface StandardDialogInterface {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xl'; // Add a size prop with default options
  className?: string;
}

const sizeClasses = {
  small: 'sm:max-w-md',
  medium: 'sm:max-w-lg',
  large: 'sm:max-w-4xl',
  xl: 'sm:max-w-6xl sm:h-[40rem]',
  // xl: 'sm:max-w-6xl sm:h-[40rem]',
};

export const StandardDialog = ({
  open,
  setOpen,
  children,
  size = 'medium',
  className,
}: StandardDialogInterface) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      {/* Have to set z-index to 1001 becuase BlockNotes by default comes with a component that is 1000 */}
      <Dialog as="div" className="relative z-1001" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-dark-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-1001 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-lg bg-zinc-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full ${sizeClasses[size]} sm:p-6 text-text-primary ${className}`}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
