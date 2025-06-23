import type { Config } from 'tailwindcss'
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

import svgToDataUri from 'mini-svg-data-uri'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-primary',
    'bg-secondary',
    'border-primary',
    'border-secondary',
    'text-primary',
    'text-secondary',
    'shadow-primary',
    'shadow-secondary',
    // Shadow opacity variants
    {
      pattern:
        /^shadow-(primary|secondary)\/(5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95)$/,
    },
    // Border opacity variants
    {
      pattern:
        /^border-(primary|secondary)\/(5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95)$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00E676',
        secondary: '#2979FF',
        muted: '#A5A5A5',

        // Greys
        grey: {
          60: '#999999',
          70: '#6CAFC1',
          80: '#475D63',
        },

        // Browns
        brown: {
          60: '#CB6E27',
          70: '#69352F',
        },

        // Green Tones (CTA & Icons)
        green: '#00E676',

        // Blue Tones
        blue: {
          primary: '#2979FF',
          hover: '#5393FF',
          icon: '#2979FF',
        },

        // Gold / Highlight
        gold: {
          coin: '#FFD600',
          icon: '#767B12',
        },

        // Accent Colors
        red: {
          60: '#FF2929',
        },
        purple: {
          60: '#A22CFF',
        },
        orange: {
          60: '#FEB600',
        },

        // Backgrounds & Layout
        background: {
          main: '#0F1115',
          gradientMiddle: '#111318',
          header: '#111318',
          card: '#1B1A1F',
        },
        border: {
          card: '#2A2D33',
        },
      },
      boxShadow: {
        lg: '0px 6px 0px 0px var(--tw-shadow-primary)',
        sm: '0px 2px 0px 0px var(--tw-shadow-primary)',
        primary: `0px 6px 0px 0px var(--tw-shadow-primary)`,
        secondary: `0px 6px 0px 0px var(--secondary)`,
        derek: `0px 0px 0px 1px rgb(0 0 0 / 0.06),
        0px 1px 1px -0.5px rgb(0 0 0 / 0.06),
        0px 3px 3px -1.5px rgb(0 0 0 / 0.06), 
        0px 6px 6px -3px rgb(0 0 0 / 0.06),
        0px 12px 12px -6px rgb(0 0 0 / 0.06),
        0px 24px 24px -12px rgb(0 0 0 / 0.06)`,
        aceternity: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        move: 'move 5s linear infinite',
        'spin-circle': 'spin-circle 3s linear infinite',
      },
      keyframes: {
        move: {
          '0%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(200px)' },
        },
        'spin-circle': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'bg-grid': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-grid-small': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-dot': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
          'bg-dot-thick': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )

      matchUtilities(
        {
          highlight: (value: any) => ({
            boxShadow: `inset 0 1px 0 0 ${value}`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )
    },
  ],
}

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ':root': newVars,
  })
}

export default config
