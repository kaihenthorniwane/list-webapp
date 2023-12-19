/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define a custom font family for your header class
        header: ['"nagel-variable"', "sans"],
        // Define a custom font family for your body class
        body: ['"cofo-sans-variable"', "sans"],
      },
      fontSize: {
        38: "2.375rem", // 38px
        32: "2rem", // 32px
        24: "1.5rem", // 24px
        14: "0.875rem", // 14px
        12: "0.75rem", // 12px
      },
      fontWeight: {
        400: 400,
        450: 450,
        500: 500,
        700: 700,
      },
    },
  },
  plugins: [],
};
