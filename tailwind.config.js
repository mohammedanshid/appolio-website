/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        apollio: {
          orange: '#f47a20',
          amber: '#fff5eb',
          ink: '#171717',
          charcoal: '#2f2f2f',
          mist: '#f8f4ef',
        },
      },
      boxShadow: {
        soft: '0 24px 80px rgba(17, 17, 17, 0.08)',
      },
    },
  },
  plugins: [],
};
