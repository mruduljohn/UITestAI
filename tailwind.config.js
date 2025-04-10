/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3366FF',
        'success': '#10B981',
        'danger': '#EF4444',
        'warning': '#F59E0B',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
} 