// https://www.blocknotejs.org/docs/editor-basics/document-structure

import { NoteTemplate } from './note-template.type';

export const LogWorkMeeting: NoteTemplate = {
  name: 'Log Work Meeting',
  title: `Meeting with {person.firstName} on {date.today}`,
  body: [
    {
      id: 'aa3030f3-6a6f-4874-9a7c-bab621d3f8ce',
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
          text: 'Meeting Objective',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: 'ad21c24b-633e-4ac4-b72c-8c15fabde750',
      type: 'paragraph',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: 'Write 2-3 sentences about the main objective of the meeting.',
          styles: {
            italic: true,
          },
        },
      ],
      children: [],
    },
    {
      id: 'b0ce816c-8ad6-4fbd-84fa-e0c25a3c3172',
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
      id: 'dfb7ff9c-6d2d-4c2b-9a5a-c3157c7df598',
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
          text: 'Key Points Discussed',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: 'adbe6d4c-4301-4fc7-88d7-0a096e7ae15b',
      type: 'bulletListItem',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
        textAlignment: 'left',
      },
      content: [
        {
          type: 'text',
          text: ' ',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '350637e7-11af-4a33-84d2-f06f39447126',
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
      id: 'b9e89896-335a-4a42-ba2d-8dfc0581e8f3',
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
          text: 'Decisions Made',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '317a4957-9631-4bc1-be65-370da236b1c8',
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
      id: 'f531bd70-1ca3-481b-8654-dd1a849f7ffb',
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
      id: 'f273b1ee-c855-492c-9bea-e5f717dca7eb',
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
          text: 'Action Items',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '85558114-17ef-4e16-899a-c5ed610da095',
      type: 'table',
      props: {
        textColor: 'default',
        backgroundColor: 'default',
      },
      content: {
        type: 'tableContent',
        rows: [
          {
            cells: [
              [
                {
                  type: 'text',
                  text: 'Task',
                  styles: {
                    bold: true,
                  },
                },
              ],
              [
                {
                  type: 'text',
                  text: 'Assigned To',
                  styles: {
                    bold: true,
                  },
                },
              ],
              [
                {
                  type: 'text',
                  text: 'Due Date',
                  styles: {
                    bold: true,
                  },
                },
              ],
              [
                {
                  type: 'text',
                  text: 'Status',
                  styles: {
                    bold: true,
                  },
                },
              ],
            ],
          },
          {
            cells: [[], [], [], []],
          },
          {
            cells: [[], [], [], []],
          },
        ],
      },
      children: [],
    },
    {
      id: '087d7b49-e330-4043-8ea2-d110f0a483af',
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
      id: '6cf0b20d-5dee-4728-996b-62de25f11ada',
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
          text: 'Detailed / Additional Notes',
          styles: {},
        },
      ],
      children: [],
    },
    {
      id: '376214b3-a028-492b-ae20-2fd891c44fba',
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
      id: '5e4ae651-d568-4984-8bef-5eb09cd5d2bf',
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
