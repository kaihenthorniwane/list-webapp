/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Define a custom font family for your header class
        header: ["degular-display", "sans"],
        // Define a custom font family for your body class
        body: ["cofo-sans-variable", "sans"],
      },
      fontSize: {
        44: "2.75rem", // 38px
        32: "2rem", // 32px
        28: "1.75rem", // 28px
        24: "1.5rem", //24px
        20: "1.25rem", //20px
        18: "1.125rem", //18px
        16: "1rem", //16px
        14: "0.875rem", // 14px
        12: "0.75rem", // 12px
      },
      fontWeight: {
        300: 300,
        400: 400,
        450: 450,
        500: 500,
        600: 600,
        700: 700,
      },
      colors: {
        "Brand-Black": "rgb(var(--Brand-Black))",
        "Brand-White": "rgb(var(--Brand-White))",
        "Brand-Red": "rgb(var(--Brand-Red))",
      },
      backgroundColor: {
        "Brand-Black": "rgb(var(--Brand-Black))",
        "Brand-White": "rgb(var(--Brand-White))",
        "Brand-Red": "rgb(var(--Brand-Red))",
      },
      backgroundImage: {
        "White-Gradient-Down":
          "linear-gradient(180deg, rgb(var(--Brand-White)) 0%, rgba(var(--Brand-White), 0.492) 80%, rgba(var(--Brand-White), 0) 100%)", // custom gradient using variable

        "White-Gradient-Down-More-White":
          "linear-gradient(180deg, rgb(var(--Brand-White)) 0%, rgba(var(--Brand-White), 0.932) 56%, rgba(var(--Brand-White), 0.627) 86%, rgba(var(--Brand-White), 0.372) 93%, rgba(var(--Brand-White), 0) 100%)", // custom gradient using variable

        "White-Gradient-Right":
          "linear-gradient(90deg, rgb(var(--Brand-White)) 0%, rgba(var(--Brand-White), 0) 100%)", // custom gradient using variable

        "White-Gradient-Left":
          "linear-gradient(270deg, rgb(var(--Brand-White)) 0%, rgba(var(--Brand-White), 0) 100%)", // custom gradient using variable
        // You can add more custom gradients here
      },
      // Adding custom text colors
      textColor: {
        "Brand-Black": "rgb(var(--Brand-Black))",
        "Brand-White": "rgb(var(--Brand-White))",
      },
      // Adding custom easing (transition timing function)
      transitionTimingFunction: {
        "fast-easing": "cubic-bezier(.06,.9,.15,1)", // Example easing function
      },
      height: {
        "folder-card": "12.75rem", //Folder card height
        "smooth-button": "3.75rem", //smooth button height
        30: "7.5rem",
      },
      width: {
        30: "7.5rem", //Folder card height
      },
      maxHeight: {
        "folder-front": "9.125rem", // Folder front height
        "folder-back": "11.125rem", // Folder back height
        "smooth-button": "3.75rem", //smooth button height
      },
      minHeight: {
        "smooth-button": "3.75rem", //smooth button height
      },
      dark: {
        colors: {
          "Brand-Black": "rgb(var(--Brand-White))", // In dark mode, black becomes white
          "Brand-White": "rgb(var(--Brand-Black))", // In dark mode, white becomes black
        },
        backgroundColor: {
          "Brand-Black": "rgb(var(--Brand-White))", // In dark mode, black becomes white
          "Brand-White": "rgb(var(--Brand-Black))", // In dark mode, white becomes black
        },
      },
    },
  },
  plugins: [],
};
