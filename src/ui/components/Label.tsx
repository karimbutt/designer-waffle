import React from 'react';

interface LabelProps {
  htmlFor: string; // Specifies the id of the form element the label is for
  children: React.ReactNode; // The content of the label, typically the label text
  className?: string; // Optional, allows customization of the label styling
}

const Label = ({ htmlFor, children, className }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-xs font-medium leading-3 text-text-secondary ${className}`}>
      {children}
    </label>
  );
};

export default Label;
