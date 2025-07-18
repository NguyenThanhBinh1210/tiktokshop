/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ea284e',
        secondary: '#00FF00',
        tertiary: '#0000FF',
        quaternary: '#FF00FF',
        quinary: '#FFFF00',
        senary: '#00FFFF'
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' }
        }
      },
      animation: {
        scroll: 'scroll 15s linear infinite'
      }
    }
  },
  plugins: []
}
