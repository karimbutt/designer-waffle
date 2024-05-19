import { darkDefaultTheme, Theme } from '@blocknote/react';

export const modifiedDarkTheme = {
  ...darkDefaultTheme,
  colors: {
    ...darkDefaultTheme.colors,
    editor: {
      text: '#ffffff',
      background: '#525252',
    },
    sideMenu: '#ffffff',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;
