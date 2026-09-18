/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#0B0C0E',
          900: '#141518',
          800: '#1C1E22',
          700: '#26282D',
          600: '#34373D',
          500: '#4A4E56',
        },
        paper: {
          DEFAULT: '#F4F5F7',
          dim: '#C6C8CC',
          faint: '#87898E',
        },
        lime: {
          DEFAULT: '#9CA85C',
          soft: '#D3D8A6',
          dim: '#6B7440',
        }
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        widest: '0.2em',
        ultra: '0.35em',
      },
    },
  },
  plugins: [],
}
