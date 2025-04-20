/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9c27b0',
          dark: '#6a1b9a',
          light: '#ba68c8',
        },
        secondary: {
          DEFAULT: '#ff4081',
          dark: '#c60055',
          light: '#ff79b0',
        },
        accent: {
          DEFAULT: '#ffd700',
          dark: '#c7a600',
          light: '#ffff52',
        },
        background: '#ffffff',
        'background-alt': '#f8f9fa',
        text: '#1a1a1a',
        'text-light': '#4a4a4a',
        'text-lighter': '#6c757d',
        border: '#dee2e6',
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
