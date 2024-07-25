/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Be Vietnam Pro", "sans-serif"],
      },
      height: {
        screen: "100dvh",
      },
      colors: {
        white: `var(--color-grey-0)`,
        gray: {
          50: `var(--color-grey-50)`,
          100: `var(--color-grey-100)`,
          200: `var(--color-grey-200)`,
          300: `var(--color-grey-300)`,
          400: `var(--color-grey-400)`,
          500: `var(--color-grey-500)`,
          600: `var(--color-grey-600)`,
          700: `var(--color-grey-700)`,
          800: `var(--color-grey-800)`,
          900: `var(--color-grey-900)`,
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
