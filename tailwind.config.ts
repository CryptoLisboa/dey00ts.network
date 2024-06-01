import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/theme'

/*
--color-artist: #8ac926;
    --color-ui-ux-designer: #f4a261;
    --color-video-editing: #6a4c93;
    --color-graphic-design: #ffca3a;
*/
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ['community-builder']: {
          DEFAULT: 'var(--color-community-builder)',
        },
        ['space-host']: {
          DEFAULT: 'var(--color-space-host)',
        },
        ['collab-manager']: {
          DEFAULT: 'var(--color-collab-manager)',
        },
        ['content-creator']: {
          DEFAULT: 'var(--color-content-creator)',
        },
        ['alpha-caller']: {
          DEFAULT: 'var(--color-alpha-caller)',
        },
        ['full-stack']: {
          DEFAULT: 'var(--color-full-stack)',
        },
        ['evm-dev']: {
          DEFAULT: 'var(--color-evm-dev)',
        },
        ['sol-dev']: {
          DEFAULT: 'var(--color-sol-dev)',
        },
        ['video-editing']: {
          DEFAULT: 'var(--color-video-editing)',
        },
        ['graphic-design']: {
          DEFAULT: 'var(--color-graphic-design)',
        },
        ['artist']: {
          DEFAULT: 'var(--color-artist)',
        },
        ['ui-ux-designer']: {
          DEFAULT: 'var(--color-ui-ux-designer)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        rowdies: ['var(--font-rowdies)'],
        lucky: ['var(--font-lucky)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
