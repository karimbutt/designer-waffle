// export const LogWorkMeeting: NoteTemplate = {
//   name: 'Log Work Meeting',
//   title: `Meeting with {person.firstName} on {date.today}`,
//   body: `## Meeting Objective
// Write a 2-3 sentence summary here
//   ## Key Outcomes /  Discussions / Decisions
//   -

//   ## Action Items!
//   -

//   ## Detailed Notes
//   -
//   `,
// };

import { NoteTemplate } from './note-template.type';

export const LogWorkMeeting: NoteTemplate = {
  name: 'Log Work Meeting',
  title: `Meeting with {person.firstName} on {date.today}`,
  body: [
    {
      type: 'heading',
      props: {
        level: 2,
      },
      content: 'Meeting Objective',
    },
    {
      type: 'paragraph',
      content: 'Write a 2-3 sentence summary here',
    },
    {
      type: 'paragraph',
    },
    {
      type: 'heading',
      props: {
        level: 2,
      },
      content: 'Detailed Notes with {person.firstName}',
    },
    {
      type: 'bulletListItem',
      content: 'Note 1',
    },
  ],
};
