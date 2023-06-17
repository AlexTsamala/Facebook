/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        KumbhSans: ["Kumbh Sans", "sans-serif"],
      },
      backgroundColor: {
        signUpColor: "#00a400",
        postContainer: "#303030",
      },
      width: {
        pagesWidth: "500px",
        postInputWidth: "420px",
      },
    },
  },
  plugins: [],
};
