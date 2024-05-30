import { darkDefaultTheme, Theme } from '@blocknote/react';

export const templatePreviewTheme = {
  ...darkDefaultTheme,
  colors: {
    ...darkDefaultTheme.colors,
    editor: {
      text: '#ffffff',
      background: '#27272a',
    },
    sideMenu: '#ffffff',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;
