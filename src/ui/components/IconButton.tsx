import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => void;
  variant: 'brand' | 'primary';
};

export const IconButton: React.FC<Props> = ({ children, onClick, variant }) => {
  const textColor = variant === 'brand' ? 'text-brand-400' : 'text-primary-500';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full p-2 ${textColor} shadow-sm hover:bg-dark-900
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-accent-200`}>
      {children}
    </button>
  );
};
