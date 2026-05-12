/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPink: "#e4007c",
        blush: "#fff1f7",
        ink: "#22111a",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        vibrant_pink: {
          primary: "#e4007c",
          secondary: "#ff4fa3",
          accent: "#12b886",
          neutral: "#22111a",
          "base-100": "#ffffff",
          "base-200": "#fff1f7",
          "base-300": "#ffd6e8",
          info: "#3b82f6",
          success: "#12b886",
          warning: "#f59e0b",
          error: "#ef174f",
        },
      },
    ],
  },
}

