/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/*.html`],
  daisyui: {
    themes: ['cupcake'],
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  
}
module.exports = {
  content: [`./views/*.html`], // all .html files
  // ...
};

