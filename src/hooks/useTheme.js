import { useState, useEffect } from 'react';

export default () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Retrieve saved theme (if any)
  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
    setMounted(true);
  }, []);

  // Persist theme into local storage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return [theme, themeToggler, mounted];
};
