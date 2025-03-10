/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "react-image-crop/dist/ReactCrop.css",
  ],
  theme: {
    extend: {
      borderRadius: {
        "5xl": "6rem", // Change this value to your desired size
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        blink: "blink 1.5s ease-in-out forwards", // Custom blink animation
      },
      fontFamily: {
        audiowide: ['Audiowide', 'cursive'],
      },
    },
  },
  plugins: [require("flowbite/plugin"),require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4CAF50", // Define your colors
          secondary: "#FF5722",
          accent: "#3F51B5",
          neutral: "#333333",
          "base-100": "#ffffff",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
          error: "#F44336",
        },
      },
    ],
  },
};
