module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'hard': '-2px 1px 0 2px rgba(0,0,0,1)'
      },
      fontFamily: {
        poppins: ["Poppins"]
      }
    },
  },
  plugins: [],
}
