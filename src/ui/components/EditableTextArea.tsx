import React, { useState, useRef, useEffect } from 'react';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EditableTextAreaProps {
  title: string;
  body: string;
  onSave: (title: string, body: string) => void;
  onDelete: () => void;
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({
  title: initialTitle,
  body: initialBody,
  onSave,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const adjustBodyHeight = () => {
    if (bodyTextareaRef.current) {
      bodyTextareaRef.current.style.height = 'auto';
      bodyTextareaRef.current.style.height = `${bodyTextareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (isEditing) {
      adjustBodyHeight();
    }
  }, [body, isEditing]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      handleSave();
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isEditing]); // Add/remove the listener only when the component is/isn't in editing mode.

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleSave = () => {
    if (isEditing) {
      // Prevent saving if we are not in editing mode
      onSave(title, body);
      setIsEditing(false);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative p-4 border rounded shadow-sm border-dark-700 bg-dark-800 text-text-primary"
      onClick={!isEditing ? handleFocus : undefined}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-2 py-1 text-lg font-semibold border-b border-dark-600 bg-dark-800 text-text-primary focus:outline-none placeholder:text-dark-500"
            placeholder="Title"
            autoFocus
          />
          <textarea
            ref={bodyTextareaRef}
            className="w-full p-2 mt-2 text-sm border rounded border-dark-600 bg-dark-800 text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-200 resize-none"
            value={body}
            onChange={handleBodyChange}
            style={{ height: 'auto', overflow: 'hidden' }} // Ensure the textarea adjusts to content height automatically
          />
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="whitespace-pre-wrap">{body}</p>
        </>
      )}

      <div className="absolute bottom-0 right-0 flex space-x-2 p-2">
        {isEditing ? (
          <CheckIcon
            className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer"
            onClick={handleSave}
          />
        ) : (
          <>
            <PencilIcon
              className="w-5 h-5 text-accent-200 hover:text-accent-100 cursor-pointer"
              onClick={handleFocus}
            />
            <XMarkIcon
              className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
              onClick={onDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EditableTextArea;
