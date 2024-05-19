import { useState } from 'react';
import { useAppContext } from '../../context/app-context';
import { NoteEditor } from '../components/NoteEditor/NoteEditor';
import { TemplatePicker } from '../components/NoteEditor/TemplatePickerDialogue';

type Variables = { [key: string]: string | number | Date | Variables };

const replaceVariables = (template: NoteTemplate, variables: Variables): NoteTemplate => {
  const replace = (str: string): string => {
    return str.replace(/{(\w+(\.\w+)*)}/g, (_, key: string) => {
      const keys = key.split('.');
      let value: string | number | Date | Variables | undefined = variables;
      for (const k of keys) {
        if (typeof value === 'object' && value !== null && k in value) {
          value = (value as Variables)[k];
        } else {
          value = undefined;
          break;
        }
      }
      return value !== undefined ? String(value) : `{${key}}`;
    });
  };

  return {
    name: template.name,
    title: replace(template.title),
    body: replace(template.body),
  };
};

export const CreateNotePage = () => {
  const { api, store } = useAppContext();

  const headerText = `New note about ${store.contacts.currentSelectedContact?.firstName} ${store.contacts.currentSelectedContact?.lastName}`;
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<undefined | string>();

  const onSave = async (title: string, body: string) => {
    const currentContact = store.contacts.currentSelectedContact;

    const titleForSave = title.trim().length > 0 ? title : 'Untitled';
    if (currentContact) {
      await api.notes.createNote({
        contactId: currentContact.id,
        body: body,
        title: titleForSave,
      });
    }
  };

  const applyTemplate = (template: NoteTemplate) => {
    const currentContact = store.contacts.currentSelectedContact;

    const variables = {
      person: {
        firstName: currentContact?.firstName || '',
        lastName: currentContact?.lastName || '',
      },
      date: {
        today: new Date().toLocaleDateString(),
      },
    };

    const appliedTemplate = replaceVariables(template, variables);

    setTitle(appliedTemplate.title);
    setBody(appliedTemplate.body);
  };

  return (
    <>
      <NoteEditor
        headerText={headerText}
        title={title}
        markdownBody={body}
        onSave={onSave}
        initialFieldFocused={true}
        applyTemplate={applyTemplate}
      />
      {/* <TemplatePicker /> */}
    </>
  );
};
