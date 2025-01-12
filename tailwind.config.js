/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "clr-yellow": "#F29C33",
        "clr-black": "#262522",
        "clr-white": "#f0f0f0",
        // "clr-white": "#F0EBE1",
        "clr-pink": "#EE6352",
        "clr-light-blue": "#C4E5FC",
        "clr-green": "#9FDC26",
      },
    },
  },
  plugins: [],
};
