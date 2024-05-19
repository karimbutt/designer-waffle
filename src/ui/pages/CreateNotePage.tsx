import { useState } from 'react';
import { useAppContext } from '../../context/app-context';
import { NoteEditor } from '../components/NoteEditor/NoteEditor';
import { TemplatePicker } from '../components/NoteEditor/TemplatePickerDialogue';
import { NoteTemplate } from '../../constants/note-templates/note-template.type';
import { PartialBlock } from '@blocknote/core';

type Variables = { [key: string]: string | number | Date | Variables };

// const replaceVariables = (template: NoteTemplate, variables: Variables): NoteTemplate => {
//   const replace = (str: string): string => {
//     return str.replace(/{(\w+(\.\w+)*)}/g, (_, key: string) => {
//       const keys = key.split('.');
//       let value: string | number | Date | Variables | undefined = variables;
//       for (const k of keys) {
//         if (typeof value === 'object' && value !== null && k in value) {
//           value = (value as Variables)[k];
//         } else {
//           value = undefined;
//           break;
//         }
//       }
//       return value !== undefined ? String(value) : `{${key}}`;
//     });
//   };

//   return {
//     name: template.name,
//     title: replace(template.title),
//     body: replace(template.body),
//   };
// };
const replaceVariablesInContent = (content: string, variables: Variables): string => {
  return content.replace(/{(\w+(\.\w+)*)}/g, (_, key: string) => {
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

const replaceVariablesInBlock = (block: PartialBlock, variables: Variables): PartialBlock => {
  const newBlock = { ...block };

  if (typeof newBlock.content === 'string') {
    newBlock.content = replaceVariablesInContent(newBlock.content, variables);
  } else if (Array.isArray(newBlock.content)) {
    newBlock.content = newBlock.content.map((item) =>
      typeof item === 'string' ? replaceVariablesInContent(item, variables) : item,
    );
  }

  if (newBlock.children && newBlock.children.length > 0) {
    newBlock.children = newBlock.children.map((child) => replaceVariablesInBlock(child, variables));
  }

  return newBlock;
};

const replaceVariables = (template: NoteTemplate, variables: Variables): NoteTemplate => {
  const replace = (str: string): string => replaceVariablesInContent(str, variables);

  return {
    name: template.name,
    title: replace(template.title),
    body: template.body.map((block) => replaceVariablesInBlock(block, variables)),
  };
};

export const CreateNotePage = () => {
  const { api, store } = useAppContext();

  const headerText = `New note about ${store.contacts.currentSelectedContact?.firstName} ${store.contacts.currentSelectedContact?.lastName}`;
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<undefined | PartialBlock[]>();

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
