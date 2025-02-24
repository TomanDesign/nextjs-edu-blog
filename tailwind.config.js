module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      screens: {
          'sm': '100%',
          'md': '100%',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1600px',
      }
    },
    extend: {
      colors: {
        "header-text": "#363B5C",
        "primary-text": "#1E2C3B",
        "secondary-text": "#8E2F3F",
        "background-gray": "#F4F4F4",
        "category-purple": "#444E8D",
        "category-yellow": "#FFBF42",
        "category-red": "#D94F4F",
        "category-green": "#82E49A",
        "link-hover": "#8E2F3F",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"], // Default text font
        display: ["Playfair Display", "serif"], // Post Headings font
      },
    },
  },
  plugins: [],
};