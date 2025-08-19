module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Vibrant blue
          light: '#3b82f6',   // Bright blue
          dark: '#1d4ed8',    // Darker blue
        },
        brand: {
          blue: '#3E38DA', // Brand blue
        },
        secondary: {
          DEFAULT: '#1e40af', // Deep blue
          light: '#3f51b5',   // Medium blue
          dark: '#1e3a8a',    // Navy blue
        },
        accent: {
          DEFAULT: '#3b82f6', // Light blue
          light: '#93c5fd',   // Pale blue
          dark: '#60a5fa',    // Mid blue
        },
        lightgray: '#F9FAFB', // Added light gray background
      },
      boxShadow: {
        'custom-light': '0px 5px 5px 0px rgba(217, 217, 217, 0.5)', // rgba version
        'custom-hex': '0px 5px 5px 0px #D9D9D980', // hex with alpha
      },
    },
  },
  plugins: [],
};
