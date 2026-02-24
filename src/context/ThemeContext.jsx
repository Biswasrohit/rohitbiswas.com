import { createContext, useLayoutEffect } from 'react';

export const ThemeContext = createContext({
  theme: 'dark',
  resolvedTheme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  useLayoutEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme: 'dark',
      resolvedTheme: 'dark',
      isDark: true,
      toggleTheme: () => {},
      setTheme: () => {},
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
