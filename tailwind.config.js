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
        messengerPhoto: "#484848",
        modalItemsHoverColor: "#65676b",
        messageBackground: "#0084FF",
      },
      textColor: {
        headersColor: "#E4E6EB",
        commentButtons: "#B0B3B8",
      },
      width: {
        pagesWidth: "500px",
        postInputWidth: "420px",
        editCommentWidth: "400px",
        editCommentTextAreaWidth: "380px",
      },
      height: {
        backgroundPhotoHeight: "500px",
      },
    },
  },
  plugins: [],
};
