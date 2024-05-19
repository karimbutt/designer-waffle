import React, { ReactNode } from 'react';

// Define the allowed types for the text component
type TextType =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'large'
  | 'regular'
  | 'small'
  | 'mini'
  | 'micro';

// Define a map from text types to their corresponding Tailwind classes
const textStyleMap: Record<TextType, string> = {
  heading1: 'text-heading1 font-semibold leading-tight',
  heading2: 'text-heading2 font-semibold leading-tight',
  heading3: 'text-heading3 font-semibold leading-tight',
  large: 'text-large font-normal leading-normal',
  regular: 'text-base font-normal leading-normal',
  small: 'text-small font-normal leading-normal',
  mini: 'text-mini font-normal leading-normal',
  micro: 'text-micro font-normal leading-normal',
};

interface TextProps {
  type?: TextType;
  className?: string;
  children?: ReactNode;
}

export const Text: React.FC<TextProps> = ({
  type = 'regular',
  className = '',
  children,
  ...props
}) => {
  // Combine the text style with any additional custom classes
  const textStyle = `${textStyleMap[type]} ${className}`;

  switch (type) {
    case 'heading1':
      return (
        <h1 className={textStyle} {...props}>
          {children}
        </h1>
      );
    case 'heading2':
      return (
        <h2 className={textStyle} {...props}>
          {children}
        </h2>
      );
    case 'heading3':
      return (
        <h3 className={textStyle} {...props}>
          {children}
        </h3>
      );
    default:
      return (
        <p className={textStyle} {...props}>
          {children}
        </p>
      );
  }
};
