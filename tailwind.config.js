/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#EAEAEA',
        charcoal: '#111111',
        coral: {
          DEFAULT: '#EB5038',
          dark: '#D03E27',
          light: '#FF6B55'
        },
        surface: {
          subtle: '#E2E2E2',
          card: '#F4F4F4',
          dark: '#0D0D0D'
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace', 'ui-monospace'],
        display: ['"Space Grotesk"', 'Syne', 'sans-serif']
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.35em',
      }
    },
  },
  plugins: [],
}
