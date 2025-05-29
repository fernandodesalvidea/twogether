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
     'fade-in': 'fadeIn 1s ease-out forwards',
  },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'translateY(10px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
},
  },
  plugins: [],
}

