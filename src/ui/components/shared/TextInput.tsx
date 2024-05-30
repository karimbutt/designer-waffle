import { Field } from 'formik';

interface TextInputProps {
  type: string;
  name: string;
  placeholder?: string;
  className?: string;
}

const TextInput = ({ type, name, placeholder, className }: TextInputProps) => {
  return (
    <Field
      type={type}
      name={name}
      className={`mt-2 pl-3 block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-text-muted focus:ring-2 focus:ring-accent-200 sm:text-sm sm:leading-6 ${className}`}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
