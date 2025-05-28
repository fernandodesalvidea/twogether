export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class', // <-- enable dark mode support
  theme: {
    extend: {
  animation: {
    'pulse-slow': 'pulse 6s ease-in-out infinite',
  },
},
  },
  plugins: [],
}