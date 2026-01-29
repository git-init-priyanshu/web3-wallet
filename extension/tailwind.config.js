/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#141414',
        'surface-hover': '#1a1a1a',
        border: '#262626',
        foreground: '#fafafa',
        muted: '#a1a1aa',
        'muted-foreground': '#71717a',
        accent: '#3b82f6',
        'accent-hover': '#2563eb',
        success: '#22c55e',
      },
    },
  },
  plugins: [],
}
