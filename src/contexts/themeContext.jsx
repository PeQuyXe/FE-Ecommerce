import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = (Children) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {Children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
