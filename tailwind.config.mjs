/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
