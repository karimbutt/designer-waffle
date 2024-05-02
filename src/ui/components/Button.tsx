import React from 'react';

interface ButtonProps {
  children: React.ReactNode; // Button text or content
  type: 'button' | 'submit' | 'reset'; // Type of the button
  disabled?: boolean; // State to control the disabled attribute
  variant?: 'primary' | 'secondary' | 'muted-primary' | 'muted-secondary'; // Optional variant to switch styles
  className?: string; // Optional additional custom styling
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button = ({
  children,
  type,
  disabled = false,
  variant = 'primary',
  className,
  onClick,
}: ButtonProps) => {
  const baseClasses = 'rounded-md px-4 py-1.5 text-sm font-semibold leading-6 ';
  // shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
  const variants = {
    primary: 'bg-indigo-600 text-text-primary hover:bg-indigo-500 focus-visible:outline-accent-300',
    secondary:
      'bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
    'muted-primary': 'bg-transparent text-text-secondary hover:text-text-primary',
    'muted-secondary': 'bg-transparent text-text-muted hover:text-text-secondary',
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <button onClick={onClick} type={type} disabled={disabled} className={buttonClasses}>
      {children}
    </button>
  );
};
