/** @type {import('tailwindcss').Config} */

import { colors } from './src/utils/colors';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // adapt this line to match the file paths in your project
  darkMode: 'class', // or 'media' based on your preference
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f5f6f6',
          100: '#e5e7e8',
          200: '#cdd1d4',
          300: '#aab1b6',
          400: '#808b90',
          500: '#657075',
          600: '#565e64',
          700: '#4a5054',
          800: '#414549',
          900: '#393c40',
          950: '#0f1011',
          primary: colors.dark.primary,
          secondary: colors.dark.secondary,
          tertiary: colors.dark.tertiary,
        },
        border: {
          primary: colors.borders.primary,
        },
        // accent: {
        //   100: '#5fafff', // Lighter blue for highlights
        //   200: '#527ba7', // Default blue for interactive elements
        //   300: '#445c73' // Darker blue for less prominent accents
        // },
        primary: {
          50: '#f0f5fd',
          100: '#e4edfb',
          200: '#cedcf7',
          300: '#b0c5f1',
          400: '#91a6e8',
          500: '#7688de',
          600: '#5e69d1',
          700: '#4b53b7',
          800: '#3f4794',
          900: '#394076',
          950: '#212345',
        },
        // accent: {
        //   50: '#fef7ee',
        //   100: '#fcedd8',
        //   200: '#f8d8b0',
        //   300: '#f2b879',
        //   400: '#ec954b',
        //   500: '#e87827',
        //   600: '#d95f1d',
        //   700: '#b4481a',
        //   800: '#903a1c',
        //   900: '#74321a',
        //   950: '#3e170c',
        // },
        // brand: {
        //   50: '#fdf3f3',
        //   100: '#fde4e3',
        //   200: '#fccdcc',
        //   300: '#f8aba9',
        //   400: '#f27c79',
        //   500: '#e7504c',
        //   600: '#d4322e',
        //   700: '#b22723',
        //   800: '#932421',
        //   900: '#7b2321',
        //   950: '#420e0d',
        // },
        brand: {
          primary: colors.brand.primary,
          secondary: colors.brand.secondary,
        },
        text: {
          primary: '#ffffff', // Primary text color
          secondary: '#e3e4e6', // Secondary text color
          muted: '#969799', // Muted text color
        },
      },
      fontFamily: {
        monospace: [
          '"SFMono Regular"',
          'Consolas',
          '"Liberation Mono"',
          'Menlo',
          'Courier',
          'monospace',
        ],
        regular: [
          '"Inter UI"',
          '"SF Pro Display"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Open Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        display: ['"Inter Display"', 'var(--font-regular)'],
        emoji: [
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Twemoji Mozilla"',
          '"Noto Color Emoji"',
          '"Android Emoji"',
        ],
      },
      fontSize: {
        micro: '0.6875rem',
        mini: '0.75rem',
        small: '0.8125rem',
        regular: '0.9375rem',
        large: '1.125rem',
        heading1: '2.25rem',
        heading2: '1.5rem',
        heading3: '1.25rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      borderRadius: {
        circle: '50%',
        rounded: '9999px',
      },
      transitionDuration: {
        none: '0s',
        quick: '0.1s',
        regular: '0.25s',
        slow: '0.35s',
        fadeOut: '0.15s',
      },
      outline: {
        focus: ['1px solid var(--focus-ring-color)', '1px'],
      },
    },
  },
  plugins: [],
};
