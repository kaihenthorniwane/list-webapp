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
        header: ["degular-variable", "sans"],
        // Define a custom font family for your body class
        body: ["cofo-sans-variable", "sans"],
      },
      fontSize: {
        44: "2.75rem", // 38px
        32: "2rem", // 32px
        28: "1.75rem", // 24px
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
      backgroundColor: {
        "Brand-Black": "#111A49",
        "Brand-White": "#FFFFFF",
      },
      backgroundImage: {
        "White-Gradient-Down":
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.49205619747899154) 80%, rgba(255,255,255,0) 100%)", // custom gradient
        // You can add more custom gradients here
      },
      // Adding custom text colors
      textColor: {
        "Brand-Black": "#111A49",
        "Brand-White": "#FFFFFF",
      },
      // Adding custom easing (transition timing function)
      transitionTimingFunction: {
        "fast-easing": "cubic-bezier(.06,.9,.15,1)", // Example easing function
      },
      height: {
        "folder-card": "12.75rem", //Folder card height
      },
      maxHeight: {
        "folder-front": "9.125rem", // Folder front height
        "folder-back": "11.125rem", // Folder back height
      },
    },
  },
  plugins: [],
};
