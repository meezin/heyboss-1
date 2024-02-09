/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        sm: '480px',
      },
    },
  },
  // plugins: [
  //   require('taos/plugin')
  // ],
  // safelist: [
  //   '!duration-[0ms]',
  //   '!delay-[0ms]',
  //   'html.js :where([class*="taos:"]:not(.taos-init))'
  // ],
  // content: {
  //   relative: true,
  //   transform: (content) => content.replace(/taos:/g, ''),
  //   files: ['./src/*.{html,js}'],
  // },
}