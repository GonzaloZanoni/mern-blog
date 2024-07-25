/* eslint-disable no-undef */
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ['"Playwrite CU"', 'sans-serif'],
      },
      aspectRatio: {
        'square': [1, 1], // Proporción cuadrada
      },
      backgroundImage: {
        'cole': "url('/img/colePrueba-2.png')",
        'grados':"url('/img/gallery-bg.png')",
      },
      backgroundSize: {
        '110%': '110%',
        '100%': '100%',
      },
      boxShadow: {
        'custom-green': '0 10px 15px -3px rgba(0, 128, 0, 0.5), 0 4px 6px -2px rgba(0, 128, 0, 0.5)',
        'custom-purple': '0 10px 15px -3px rgba(128, 0, 128, 0.5), 0 4px 6px -2px rgba(128, 0, 128, 0.5)',

      },
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%': { 'border-right-color': 'transparent' },
          '50%': { 'border-right-color': 'black' },
          '100%': { 'border-right-color': 'transparent' },
        },
      },
      animation: {
        typing: 'typing 3.5s steps(40, end) forwards, blink 0.75s step-end infinite',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar',),
  ],
};

