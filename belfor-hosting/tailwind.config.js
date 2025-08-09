module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',  // Vibrant blue
          dark: '#1d4ed8'     // Darker blue
        },
        secondary: {
          DEFAULT: '#1e40af',  // Deep blue
          dark: '#1e3a8a'      // Navy blue
        },
        accent: {
          DEFAULT: '#3b82f6',  // Light blue
          light: '#93c5fd'     // Pale blue
        }
      },
    },
  },
  plugins: [],
}