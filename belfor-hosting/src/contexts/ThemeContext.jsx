import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const defaultTheme = {
  mode: 'light',
  primaryColor: '#006400', 
  secondaryColor: '#BB0000',
  background: '#ffffff',
  text: '#000000'
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Server-side rendering check
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--background-color', theme.background);
    document.documentElement.style.setProperty('--text-color', theme.text);
    
    // Set dark/light mode class
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--background-color', '#1a202c');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--background-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#000000');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const toggleMode = () => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
      background: prev.mode === 'light' ? '#1a202c' : '#ffffff',
      text: prev.mode === 'light' ? '#ffffff' : '#000000'
    }));
  };

  const updateColors = (primary, secondary) => {
    setTheme(prev => ({
      ...prev,
      primaryColor: primary,
      secondaryColor: secondary
    }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode, updateColors, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}