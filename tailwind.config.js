const colors = require("tailwindcss/colors")

module.exports = {
  // NOTE We can not use purge,
  //   if we want our component to be imported by ohter projects.
  purge: false,
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.warmGray,
        orange: colors.orange,
        amber: colors.amber,
        lime: colors.lime,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      backgroundColor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}
