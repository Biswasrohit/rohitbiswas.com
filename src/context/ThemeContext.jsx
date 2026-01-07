import { createContext, useState, useEffect, useLayoutEffect } from 'react';

export const ThemeContext = createContext();

// Helper to get the initial resolved theme - check what's already set on the document
const getInitialResolvedTheme = () => {
  if (typeof window === 'undefined') return 'light';
  // Check what the HTML already has (set by index.html script)
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'system';
  return localStorage.getItem('theme') || 'system';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState(getInitialResolvedTheme);

  // Use useLayoutEffect to prevent flash - runs synchronously before paint
  useLayoutEffect(() => {
    const root = document.documentElement;

    const applyTheme = (themeToApply) => {
      if (themeToApply === 'dark') {
        root.classList.add('dark');
        setResolvedTheme('dark');
      } else {
        root.classList.remove('dark');
        setResolvedTheme('light');
      }
    };

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      applyTheme(systemTheme);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        if (theme === 'system') {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  const setThemeAndStore = (newTheme) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setThemeAndStore(newTheme);
  };

  const value = {
    theme,
    setTheme: setThemeAndStore,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
