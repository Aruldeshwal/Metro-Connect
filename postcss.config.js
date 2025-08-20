// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- THIS IS THE CORRECT PLUGIN NAME
    autoprefixer: {},
  },
};