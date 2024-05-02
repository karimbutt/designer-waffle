import React from 'react';
import { ErrorMessage } from 'formik';

interface ErrorMsgProps {
  name: string; // This is the name of the input field to which the error message relates
  className?: string; // Optional, allows customization of the error message styling
  component?: React.ElementType; // The component type to render, defaults to 'div'
}

const ErrorMsg = ({ name, className, component = 'div' }: ErrorMsgProps) => {
  return (
    <ErrorMessage
      name={name}
      component={component}
      className={`text-red-500 text-xs mt-1 ${className}`}
    />
  );
};

export default ErrorMsg;
