/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./src/**/*.{html,css,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

