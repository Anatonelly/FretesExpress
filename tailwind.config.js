/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xxs: '280px',
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      backgroundSize: {
        '50%': '50%',
        16: '4rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-bg':
          'linear-gradient(135deg, rgba(244,242,242, 0.06) 0%, rgba(244,242,242, 0.06) 50%,rgba(34,1,1, 0) 50%, rgba(34,1,1, 0) 100%),linear-gradient(90deg, rgb(12,20,57),rgb(12,20,57))',
      },
      boxShadow: {
        '3xl': '0 0 80px -10px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
