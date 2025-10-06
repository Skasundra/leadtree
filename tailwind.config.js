/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',  // Indigo-600
          hover: '#4338CA',     // Indigo-700
          light: '#C7D2FE',     // Indigo-200
          dark: '#3730A3',      // Indigo-800
        },
        secondary: {
          DEFAULT: '#14B8A6',   // Teal-500
          hover: '#0D9488',     // Teal-600
        },
        accent: {
          warning: '#F97316',   // Orange-500
          error: '#EF4444',     // Red-500
          success: '#22C55E',   // Green-500
          info: '#0EA5E9',      // Sky-500
        },
        // Background colors
        background: {
          light: {
            DEFAULT: '#FFFFFF',
            card: '#F8FAFC',
            sidebar: '#FFFFFF',
          },
          dark: {
            DEFAULT: '#0F172A',
            card: '#1E293B',
            sidebar: '#1E293B',
          },
        },
        // Text colors
        text: {
          primary: {
            light: '#1E293B',
            dark: '#F1F5F9',
          },
          secondary: {
            light: '#64748B',
            dark: '#94A3B8',
          },
          disabled: '#9CA3AF',
        },
        // Border colors
        border: {
          light: '#E2E8F0',
          dark: '#334155',
        },
      },
    },
  },
  plugins: [],
}