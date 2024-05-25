import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/theme'

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
