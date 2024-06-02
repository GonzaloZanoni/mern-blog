/* eslint-disable no-undef */
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-green': '0 10px 15px -3px rgba(0, 128, 0, 0.5), 0 4px 6px -2px rgba(0, 128, 0, 0.5)',
      },
    },
  },
  plugins: [ 
        flowbite.plugin(), 
        require ('tailwind-scrollbar'), 
      ],
};
    
    // plugins: [require('flowbite/plugin')],
