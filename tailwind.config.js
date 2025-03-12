// filepath: /C:/Users/Isa Nobu/OneDrive/Documents/Tuition-Sheba/Tuition-Sheba-Client/tailwind.config.js
import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      opacity: {
        90: "0.9",
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [daisyui],
};
