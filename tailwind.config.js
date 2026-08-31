/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saathi: {
          navy: '#0f172a',
          primary: '#1e3a8a',
          secondary: '#3b82f6',
          teal: '#0d9488',
          emergency: '#dc2626',
          'emergency-hover': '#b91c1c',
          success: '#15803d',
          warning: '#d97706',
          surface: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          text: '#0f172a',
          'text-muted': '#475569',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Noto Sans Devanagari', 'sans-serif'],
      },
      fontSize: {
        'senior-sm': '1.125rem',  // 18px
        'senior-base': '1.25rem', // 20px
        'senior-lg': '1.5rem',    // 24px
        'senior-xl': '1.875rem',  // 30px
        'senior-2xl': '2.25rem',  // 36px
        'senior-3xl': '3rem',     // 48px
      },
      minHeight: {
        'touch': '4rem', // 64px
      }
    },
  },
  plugins: [],
}
