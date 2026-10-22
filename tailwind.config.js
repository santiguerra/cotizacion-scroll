/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scroll: {
          navy: '#01122a',
          dark: '#031b3d',
          blue: '#033369',
          deep: '#022751',
          petroleo: '#043E71',
          turquesa: '#02CCB5',
          turquesaLight: '#02E7C1',
          lima: '#AEF905',
          limaHover: '#98dc03',
          papel: '#F5F4F3',
          tinta: '#1E2B8C',
        },
        metalevel: {
          bg: '#090418',
          surface: '#140b2e',
          violet: '#7c3aed',
          cyan: '#00f0ff',
          magenta: '#ec4899',
        }
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        script: ['Kaushan Script', 'cursive'],
      },
    },
  },
  plugins: [],
};
