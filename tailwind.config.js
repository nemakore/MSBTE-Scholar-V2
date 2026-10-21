/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F3EBD8',
          300: '#EBDDC0',
          400: '#DECBA3',
          500: '#D1B986',
        },
        emerald: {
          DEFAULT: '#0B3B2E',
          deep: '#062D24',
          subtle: '#135442',
          light: '#E7F2EE',
          border: '#1E5E4C',
        },
        gold: {
          DEFAULT: '#D4AF37',
          soft: '#F1DFA4',
          light: '#FBF5E5',
          dark: '#B08F26',
        },
        ruby: {
          DEFAULT: '#B3202F',
          light: '#FDECEE',
        },
        border: 'var(--border-color)',
        card: {
          DEFAULT: 'var(--card-bg)',
          foreground: 'var(--card-fg)',
        },
        muted: {
          DEFAULT: 'var(--muted-bg)',
          foreground: 'var(--muted-fg)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        btn: '12px',
        chip: '9999px',
      },
      boxShadow: {
        subtle: '0 2px 8px -2px rgba(11, 59, 46, 0.06), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        card: '0 4px 20px -4px rgba(11, 59, 46, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        elevated: '0 12px 32px -6px rgba(11, 59, 46, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        gold: '0 4px 14px 0 rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
};
