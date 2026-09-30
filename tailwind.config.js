/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFAF6',
          100: '#FAF6F0',
          200: '#F5EFE6',
          300: '#EFE7D9',
        },
        beige: {
          100: '#E8DFD3',
          200: '#DDD3C3',
          300: '#D0C4B0',
        },
        sage: {
          50: '#F3F4F7',
          100: '#E4E6ED',
          200: '#C5C8D4',
          300: '#A4A8B8',
          400: '#85899B',
          500: '#686D80',
          600: '#4F5364',
        },
        bluegray: {
          50: '#F0F3F6',
          100: '#DCE3EA',
          200: '#B8C5D1',
          300: '#8B9DAF',
          400: '#6B7D8F',
          500: '#556677',
        },
        terracotta: {
          50: '#FFF8E8',
          100: '#F8E8BD',
          200: '#F0D891',
          300: '#E8C46E',
          400: '#DDB15F',
          500: '#C9993F',
          600: '#AA7F2E',
        },
        lavender: {
          50: '#F5F2F8',
          100: '#E8E1F0',
          200: '#D0C5DE',
          300: '#B5A8C4',
          400: '#9E8FB5',
          500: '#8A7AA0',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        soft: '0 2px 12px 0 rgba(79, 83, 100, 0.06)',
        'soft-lg': '0 8px 30px 0 rgba(79, 83, 100, 0.08)',
        'soft-xl': '0 20px 60px -10px rgba(79, 83, 100, 0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.35s ease-out forwards',
      },
    },
  },
  plugins: [],
};
