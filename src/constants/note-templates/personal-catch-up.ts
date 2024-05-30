// https://www.blocknotejs.org/docs/editor-basics/document-structure

import { NoteTemplate } from './note-template.type';

export const PersonalCatchup: NoteTemplate = {
  name: 'Log Personal Catch-up',
  category: 'Catching up',
  title: `Caught up with {person.firstName} on {date.today}`,
  description:
    'Effortlessly capture the essence of your personal catch-ups with this template. Log memorable moments, shared interests, and future plans to strengthen relationships and stay connected.',
  body: [
    {
      id: '360254ae-f3d4-47dd-a637-2e5594bb09a7',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Location: ',
          styles: {
            bold: true,
          },
        },
        {
          type: 'text',
          text: '[Insert Location] (e.g., Café, Home, Zoom)',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: 'c6b6fc39-e1ee-40c3-8b57-d9071d7ceb35',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [],
      children: [],
    },
    {
      id: '92adf039-3475-413d-9953-4bb746707143',
      type: 'heading',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Highlights',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: 'b07efc9c-9e0a-46c8-acc8-955222e918f2',
      type: 'bulletListItem',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Highlight 1:',
          styles: {
            bold: true,
          },
        },
        {
          type: 'text',
          text: ' [Description] ',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '1c4e4b62-665e-4bc7-a2e2-edd0809b8e41',
      type: 'bulletListItem',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Highlight 2:',
          styles: {
            bold: true,
          },
        },
        {
          type: 'text',
          text: ' [Description] ',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '82005593-a10e-44f3-b8bb-ea96c98fcb47',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [],
      children: [],
    },
    {
      id: '03ec23f2-5663-4554-86ff-f2f9650ce448',
      type: 'heading',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Topics Discussed',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '3885dc2c-280e-48b6-8d73-0a1c1f1bb2d8',
      type: 'bulletListItem',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Topic 1:',
          styles: {
            bold: true,
          },
        },
        {
          type: 'text',
          text: ' [Details] ',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '6a844541-70f6-410e-8aec-4a815f770163',
      type: 'bulletListItem',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Topic 2:',
          styles: {
            bold: true,
          },
        },
        {
          type: 'text',
          text: ' [Details]',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '49a2bbb2-a6f3-4fdd-925f-8eef732caa4a',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [],
      children: [],
    },
    {
      id: '7d7f1773-4ef5-41ac-ae4a-605a3945bc0c',
      type: 'heading',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Shared Interests or Plans',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '1e93f118-1b4c-4530-bb9c-61f667269f6f',
      type: 'bulletListItem',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Interest/Plan 1:',
          styles: {
            bold: true,
          },
        },
        {
          type: 'text',
          text: ' [Description] ',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '5f6ca2ff-7b99-40a3-910f-f0d8c7d9c8cf',
      type: 'bulletListItem',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Interest/Plan 2:',
          styles: {
            bold: true,
          },
        },
        {
          type: 'text',
          text: ' [Description]',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: 'ab725ceb-a718-4c27-89f9-f86dc9822976',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [],
      children: [],
    },
    {
      id: '1986edce-4283-4ae6-ba8c-e07d78cad267',
      type: 'heading',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Additional Notes',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '2b2e0236-e784-458b-8394-3239c435f3c6',
      type: 'bulletListItem',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [],
      children: [],
    },
    {
      id: 'b2ff2943-e57f-43ea-ad9f-5413c1135f37',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [],
      children: [],
    },
  ],
};
