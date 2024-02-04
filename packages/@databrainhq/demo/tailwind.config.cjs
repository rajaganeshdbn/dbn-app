/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        "primary-text": "var(--text-color)",
        highlight: "var(--highlight-color)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
