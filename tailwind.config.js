module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "figma-blue": "#3E537E",
        "figma-orange": "#FF5C33",
        "figma-pink": "#EA426E",
        "figma-gray": "#DCDCDC",
      },
      fontFamily: {
        karla: ["Karla", "regular"],
        rubik: ["Rubik", "regular"],
      },
      spacing: {
        112: "28rem",
        120: "30rem",
        128: "32rem",
        140: "35rem",
        160: "40rem",
      },
    },
  },

  variants: {
    extend: {
      textAlign: ["responsive", "focus"],
      placeholderColor: ["responsive", "dark", "focus", "hover"],
    },
  },
  plugins: [],
};
