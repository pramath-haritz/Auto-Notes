/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        typewriter: ["Special Elite", "cursive"],
        merriweather: ["Merriweather", "serif"],
      },
      colors: {
        greyBlack: "#343031",
        lightGrey: "#EBEBEB",
        blackButton: "#3C3635",
        beigeText: "#E7E4D4",
        hoverbeigeText: "#CFCDBE",
        cardBackground: "#CBC8C5",
        greySubtitle: "#474747",
        titleColor: "#CBC8C5",
        footerBackground: "#3C3635",
        yellowBackground: "#E7E4D4",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
