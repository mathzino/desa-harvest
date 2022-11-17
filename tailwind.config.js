/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        wave_pattern: "url('/wave.svg')",
      },
      colors: {
        mygreen_dark: "#618D80",
        mygreen: "#D9EFE8",
      },
    },
  },
  plugins: [],
};
