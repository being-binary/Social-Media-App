/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './views/**/*.ejs',  // If you're using EJS for views
    './public/**/*.html', // If you have static HTML files
    './views/**/*.hbs',   // For Handlebars, if applicable
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

