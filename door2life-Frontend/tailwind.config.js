// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        grassGreen: "#2ECC71", // Custom grass green color
        slate800: "#1E293B", // Slate-800 color for background
        greengrass: "#4CAF50",
        gray: "#193940", // bg
        lightgray: "#000", // text
        green: "#9Bf272", // buttons
        darkGreen: "#7ABF5A", // hover
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Include tailwindcss-animate plugin if needed
};
